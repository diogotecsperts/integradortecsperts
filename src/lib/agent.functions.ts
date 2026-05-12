// Agente IA — Minimax M2.7 (OpenAI-compatible) com tool calling escopado por tenant.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { resolveActiveTenantId } from "@/lib/tenant-resolve.server";

// Endpoint OpenAI-compatible da Minimax (https://platform.minimax.io/docs/api-reference/text-chat-openai)
const MINIMAX_URL = "https://api.minimax.io/v1/chat/completions";
const MODEL = "MiniMax-M2.7";

function buildSystemPrompt(): string {
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit" })
      .format(d);
  const now = new Date();
  const today = fmt(now);
  const minus = (days: number) => { const d = new Date(now); d.setUTCDate(d.getUTCDate() - days); return fmt(d); };
  const human = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo", weekday: "long", day: "2-digit", month: "long", year: "numeric",
  }).format(now);
  const [yyyy, mm] = today.split("-");
  return `Você é um Especialista em BI e ERP integrado ao Bling, atuando dentro do sistema Tecsperts.

CONTEXTO TEMPORAL (autoritativo, sobrepõe seu conhecimento interno):
- Data atual: ${today} (${human})
- Hoje - 7 dias: ${minus(7)}
- Hoje - 30 dias: ${minus(30)}
- Hoje - 90 dias: ${minus(90)}
- Início do mês atual: ${yyyy}-${mm}-01
- Início do ano atual: ${yyyy}-01-01
Use SEMPRE essas datas como referência. NUNCA assuma outro ano. Se o usuário disser "hoje", "este mês", "este ano" ou "últimos N dias", calcule a partir das datas acima.

DIRETRIZES:
- Responda SEMPRE em PT-BR, objetivo e profissional.
- NUNCA exponha raciocínio interno ou tags <think>, <thinking>, <reasoning>, <tool_call>. Responda apenas com o resultado final, limpo.
- NUNCA invente números. Use as ferramentas para consultar dados reais do tenant.
- Em \`summarize_sales\`, prefira OMITIR \`from\`/\`to\` para "últimos 30 dias". Só passe datas quando o usuário citar período específico, derivado do CONTEXTO TEMPORAL acima.
- Se uma tool retornar \`data_availability\`, refaça a chamada com o range correto antes de responder.
- Se uma tool retornar lista vazia mesmo com range correto, oriente o usuário a rodar o Sync.
- Use no máximo 4 ferramentas por resposta.

FORMATAÇÃO DE RESPOSTA (siga EXATAMENTE):
- Listas curtas → bullets:
  - Total: R$ 12.345,67
  - Pedidos: 42
  - Ticket médio: R$ 293,94
- Tabelas (mín. 3 colunas, SEMPRE com LINHA EM BRANCO antes e depois, cada linha em sua própria quebra REAL):

| Período | Pedidos | Total |
| --- | --- | --- |
| Jan/26 | 120 | R$ 37.988,00 |
| Fev/26 | 98 | R$ 31.200,50 |

- NUNCA escreva "\\n" como texto literal — use quebras reais.
- NUNCA use tabela para 2 colunas — prefira bullets.`;
}

// Remove raciocínio interno e artefatos do MiniMax antes de exibir/persistir.
function sanitizeAssistant(text: string): string {
  if (!text) return text;
  let out = text;
  out = out.replace(/<(think|thinking|reasoning)>[\s\S]*?<\/\1>/gi, "");
  out = out.replace(/<(think|thinking|reasoning)>[\s\S]*$/i, "");
  out = out.replace(/<\/(think|thinking|reasoning)>/gi, "");
  out = out.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "");
  out = out.replace(/<\/?tool_call>/gi, "");
  out = out.replace(/<\|[^|]*\|>/g, "");
  return out.trim();
}

// Normaliza markdown: \n literal → newline real; garante linha em branco em torno de tabelas.
function normalizeMarkdown(text: string): string {
  if (!text) return text;
  let out = text;
  out = out.replace(/\\n/g, "\n");
  out = out.replace(/([^\n])\n(\|[^\n]+\|)/g, "$1\n\n$2");
  out = out.replace(/(\|[^\n]+\|)\n([^\n|])/g, "$1\n\n$2");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

function cleanReply(text: string): string {
  return normalizeMarkdown(sanitizeAssistant(text));
}

type ChatMessage = {
  role: "system" | "user" | "assistant" | "tool";
  content: string | null;
  name?: string;
  tool_call_id?: string;
  tool_calls?: Array<{
    id: string;
    type: "function";
    function: { name: string; arguments: string };
  }>;
};

// ============ TOOLS DEFINITIONS ============
const TOOLS = [
  {
    type: "function",
    function: {
      name: "search_products",
      description: "Busca produtos do catálogo do tenant por nome, código ou GTIN.",
      parameters: {
        type: "object",
        properties: {
          q: { type: "string", description: "Termo de busca (nome, código ou GTIN)" },
          limit: { type: "integer", minimum: 1, maximum: 20, default: 10 },
        },
        required: ["q"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_stock_for_product",
      description: "Retorna saldo físico e virtual de um produto em todos os depósitos.",
      parameters: {
        type: "object",
        properties: { produto_id: { type: "integer", description: "bling_id do produto" } },
        required: ["produto_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "summarize_sales",
      description: "Agrega valor e quantidade de pedidos de venda em uma janela de tempo.",
      parameters: {
        type: "object",
        properties: {
          from: { type: "string", description: "Data inicial YYYY-MM-DD (default: 30 dias atrás)" },
          to: { type: "string", description: "Data final YYYY-MM-DD (default: hoje)" },
          group_by: { type: "string", enum: ["none", "day", "month", "situacao"], default: "none" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "low_stock_alerts",
      description: "Lista produtos com saldo físico total abaixo do threshold (default 5).",
      parameters: {
        type: "object",
        properties: {
          threshold: { type: "number", default: 5 },
          limit: { type: "integer", minimum: 1, maximum: 50, default: 20 },
        },
      },
    },
  },
];

// ============ TOOL HANDLERS ============
async function execTool(name: string, args: Record<string, unknown>, tenantId: string): Promise<unknown> {
  switch (name) {
    case "search_products": {
      const q = String(args.q ?? "").trim();
      const limit = Math.min(Number(args.limit ?? 10), 20);
      if (!q) return { error: "q é obrigatório" };
      const { data } = await supabaseAdmin
        .from("bling_products")
        .select("bling_id, codigo, nome, preco, situacao, gtin")
        .eq("tenant_id", tenantId)
        .or(`nome.ilike.%${q}%,codigo.ilike.%${q}%,gtin.ilike.%${q}%`)
        .limit(limit);
      return { results: data ?? [] };
    }
    case "get_stock_for_product": {
      const pid = Number(args.produto_id);
      if (!pid) return { error: "produto_id inválido" };
      const { data: balances } = await supabaseAdmin
        .from("bling_stock_balances")
        .select("deposito_id, saldo_fisico, saldo_virtual")
        .eq("tenant_id", tenantId)
        .eq("produto_id", pid);
      const { data: prod } = await supabaseAdmin
        .from("bling_products")
        .select("bling_id, codigo, nome")
        .eq("tenant_id", tenantId).eq("bling_id", pid).maybeSingle();
      const { data: deps } = await supabaseAdmin
        .from("bling_deposits")
        .select("bling_id, nome").eq("tenant_id", tenantId);
      const depMap = new Map((deps ?? []).map((d) => [d.bling_id, d.nome]));
      const enriched = (balances ?? []).map((b) => ({
        deposito_id: b.deposito_id,
        deposito_nome: depMap.get(b.deposito_id) ?? null,
        saldo_fisico: Number(b.saldo_fisico),
        saldo_virtual: Number(b.saldo_virtual),
      }));
      const total_fisico = enriched.reduce((s, b) => s + b.saldo_fisico, 0);
      const total_virtual = enriched.reduce((s, b) => s + b.saldo_virtual, 0);
      return { produto: prod, balances: enriched, total_fisico, total_virtual };
    }
    case "summarize_sales": {
      const to = (args.to as string) ?? new Date().toISOString().slice(0, 10);
      const fromDefault = new Date(); fromDefault.setDate(fromDefault.getDate() - 30);
      const from = (args.from as string) ?? fromDefault.toISOString().slice(0, 10);
      const groupBy = (args.group_by as string) ?? "none";
      const { data } = await supabaseAdmin
        .from("bling_orders")
        .select("data, valor_total, situacao_nome, situacao_id, cliente_id")
        .eq("tenant_id", tenantId)
        .gte("data", from).lte("data", to)
        .limit(10000);
      const rows = data ?? [];
      if (rows.length === 0) {
        const { data: diag } = await supabaseAdmin
          .from("bling_orders")
          .select("data")
          .eq("tenant_id", tenantId)
          .order("data", { ascending: true })
          .limit(1);
        const { data: diag2 } = await supabaseAdmin
          .from("bling_orders")
          .select("data")
          .eq("tenant_id", tenantId)
          .order("data", { ascending: false })
          .limit(1);
        const { count } = await supabaseAdmin
          .from("bling_orders")
          .select("*", { count: "exact", head: true })
          .eq("tenant_id", tenantId);
        return {
          from, to, total: 0, count: 0, customers: 0, ticket_medio: 0,
          data_availability: {
            earliest: diag?.[0]?.data ?? null,
            latest: diag2?.[0]?.data ?? null,
            total_orders: count ?? 0,
          },
          hint: "Janela vazia. Use 'data_availability' para refazer a chamada com um range que cubra os dados existentes.",
        };
      }
      const total = rows.reduce((s, r) => s + Number(r.valor_total || 0), 0);
      const count = rows.length;
      const customers = new Set(rows.map((r) => r.cliente_id).filter(Boolean)).size;
      const ticket = count ? total / count : 0;
      const base = { from, to, total, count, customers, ticket_medio: ticket };
      if (groupBy === "none") return base;
      const map = new Map<string, { key: string; total: number; count: number }>();
      for (const r of rows) {
        let key = "—";
        if (groupBy === "day") key = (r.data ?? "").slice(0, 10);
        else if (groupBy === "month") key = (r.data ?? "").slice(0, 7);
        else if (groupBy === "situacao") key = r.situacao_nome ?? `Sit ${r.situacao_id ?? "?"}`;
        const prev = map.get(key) ?? { key, total: 0, count: 0 };
        prev.total += Number(r.valor_total || 0); prev.count += 1;
        map.set(key, prev);
      }
      return { ...base, groups: [...map.values()].sort((a, b) => b.total - a.total) };
    }
    case "low_stock_alerts": {
      const threshold = Number(args.threshold ?? 5);
      const limit = Math.min(Number(args.limit ?? 20), 50);
      const { data: balances } = await supabaseAdmin
        .from("bling_stock_balances")
        .select("produto_id, saldo_fisico")
        .eq("tenant_id", tenantId)
        .limit(20000);
      const totals = new Map<number, number>();
      for (const b of balances ?? []) {
        totals.set(b.produto_id, (totals.get(b.produto_id) ?? 0) + Number(b.saldo_fisico));
      }
      const lowIds = [...totals.entries()].filter(([, v]) => v <= threshold)
        .sort((a, b) => a[1] - b[1]).slice(0, limit);
      if (lowIds.length === 0) return { results: [], threshold };
      const { data: prods } = await supabaseAdmin
        .from("bling_products")
        .select("bling_id, codigo, nome")
        .eq("tenant_id", tenantId)
        .in("bling_id", lowIds.map(([id]) => id));
      const pmap = new Map((prods ?? []).map((p) => [p.bling_id, p]));
      return {
        threshold,
        results: lowIds.map(([id, total]) => ({
          produto_id: id, saldo_total: total, ...(pmap.get(id) ?? {}),
        })),
      };
    }
    default:
      return { error: `Tool desconhecida: ${name}` };
  }
}

// ============ MINIMAX CALL ============
async function callMinimax(apiKey: string, messages: ChatMessage[]): Promise<{
  message: ChatMessage; finish_reason: string;
}> {
  const res = await fetch(MINIMAX_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      tools: TOOLS,
      tool_choice: "auto",
      temperature: 0.2,
      max_tokens: 2048,
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("[minimax]", res.status, text.slice(0, 500));
    if (res.status === 401 || res.status === 403) throw new Error("Chave Minimax inválida — atualize em Configurações.");
    if (res.status === 429) throw new Error("Limite de requisições Minimax atingido, tente em instantes.");
    throw new Error(`Minimax ${res.status}: ${text.slice(0, 300)}`);
  }
  let json: { choices?: Array<{ message: ChatMessage; finish_reason: string }> };
  try { json = JSON.parse(text); } catch { throw new Error(`Minimax resposta inválida: ${text.slice(0, 300)}`); }
  const choice = json.choices?.[0];
  if (!choice) throw new Error("Minimax não retornou choices.");
  return { message: choice.message, finish_reason: choice.finish_reason };
}

// ============ SERVER FUNCTIONS ============
export const chatWithAgent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({
    conversationId: z.string().uuid().optional(),
    tenantId: z.string().uuid().optional(),
    message: z.string().min(1).max(4000),
  }).parse(d))
  .handler(async ({ data, context }) => {
    const tenantId = await resolveActiveTenantId(context.userId, data.tenantId);
    if (!tenantId) throw new Response("Sem tenant associado.", { status: 400 });

    const { data: settings } = await supabaseAdmin
      .from("tenant_settings").select("minimax_api_key").eq("tenant_id", tenantId).maybeSingle();
    const apiKey = settings?.minimax_api_key;
    if (!apiKey) throw new Response("Chave Minimax não configurada para este tenant.", { status: 400 });

    // Conversa
    let convId = data.conversationId;
    if (!convId) {
      const { data: created, error } = await supabaseAdmin
        .from("ai_conversations")
        .insert({
          tenant_id: tenantId, user_id: context.userId,
          title: data.message.slice(0, 60),
        }).select("id").single();
      if (error) throw new Response(error.message, { status: 500 });
      convId = created.id;
    }

    // Histórico
    const { data: history } = await supabaseAdmin
      .from("ai_messages")
      .select("role, content")
      .eq("conversation_id", convId)
      .order("created_at", { ascending: true })
      .limit(40);
    const messages: ChatMessage[] = [
      { role: "system", content: buildSystemPrompt() },
      ...((history ?? []).map((m) => ({ role: m.role as "user" | "assistant", content: m.content }))),
      { role: "user", content: data.message },
    ];

    // Persiste mensagem do usuário
    await supabaseAdmin.from("ai_messages").insert({
      conversation_id: convId, tenant_id: tenantId, role: "user", content: data.message,
    });

    // Loop tool calling
    let iteration = 0;
    let finalText = "";
    while (iteration < 5) {
      iteration++;
      const { message } = await callMinimax(apiKey, messages);
      if (message.tool_calls && message.tool_calls.length > 0) {
        messages.push({
          role: "assistant",
          content: message.content ?? "",
          tool_calls: message.tool_calls,
        });
        for (const call of message.tool_calls) {
          let parsed: Record<string, unknown> = {};
          try { parsed = JSON.parse(call.function.arguments || "{}"); } catch { /* noop */ }
          const result = await execTool(call.function.name, parsed, tenantId);
          messages.push({
            role: "tool",
            tool_call_id: call.id,
            name: call.function.name,
            content: JSON.stringify(result).slice(0, 8000),
          });
        }
        continue;
      }
      finalText = stripThinkTags(message.content ?? "");
      break;
    }
    if (!finalText) finalText = "Não consegui completar a resposta. Tente reformular a pergunta.";

    await supabaseAdmin.from("ai_messages").insert({
      conversation_id: convId, tenant_id: tenantId, role: "assistant", content: finalText,
    });

    return { conversationId: convId, reply: finalText };
  });
