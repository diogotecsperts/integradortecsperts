import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Menu, MessageSquarePlus, Send, Sparkles, Trash2, User2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { cn, formatRelative } from "@/lib/utils";
import {
  chatWithAgent,
  deleteConversation,
  getConversationMessages,
  listConversations,
} from "@/lib/agent.functions";
import { listTenantsForSelector } from "@/lib/admin.functions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Route = createFileRoute("/_authenticated/agent")({
  component: AgentPage,
});

const STORAGE_KEY = "tecsperts.activeTenantId";

type Msg = { id: string; role: "user" | "assistant"; content: string };

function cleanAssistant(text: string): string {
  if (!text) return text;
  let out = text;
  out = out.replace(/<(think|thinking|reasoning)>[\s\S]*?<\/\1>/gi, "");
  out = out.replace(/<(think|thinking|reasoning)>[\s\S]*$/i, "");
  out = out.replace(/<\/(think|thinking|reasoning)>/gi, "");
  out = out.replace(/<tool_call>[\s\S]*?<\/tool_call>/gi, "");
  out = out.replace(/<\/?tool_call>/gi, "");
  out = out.replace(/<\|[^|]*\|>/g, "");
  out = out.replace(/\\n/g, "\n");
  out = out.replace(/([^\n])\n(\|[^\n]+\|)/g, "$1\n\n$2");
  out = out.replace(/(\|[^\n]+\|)\n([^\n|])/g, "$1\n\n$2");
  out = out.replace(/\n{3,}/g, "\n\n");
  return out.trim();
}

const SUGGESTIONS = [
  "Resuma minhas vendas dos últimos 30 dias.",
  "Quais produtos estão com estoque baixo?",
  "Compare as vendas por situação no último mês.",
  "Qual o saldo do produto com código ABC?",
];

function AgentPage() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [conversationId, setConversationId] = React.useState<string | undefined>();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const endRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const chat = useServerFn(chatWithAgent);
  const fetchTenants = useServerFn(listTenantsForSelector);
  const fetchConversations = useServerFn(listConversations);
  const fetchMessages = useServerFn(getConversationMessages);
  const removeConversation = useServerFn(deleteConversation);

  const tenantsQ = useQuery({ queryKey: ["tenants-selector"], queryFn: () => fetchTenants() });

  const [tenantId, setTenantId] = React.useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(STORAGE_KEY) ?? undefined;
  });

  React.useEffect(() => {
    if (!tenantsQ.data) return;
    const list = tenantsQ.data.tenants;
    if (!list.length) return;
    if (!tenantId || !list.find((t) => t.id === tenantId)) {
      const next = list[0]!.id;
      setTenantId(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
    }
  }, [tenantsQ.data, tenantId]);

  const conversationsQ = useQuery({
    queryKey: ["conversations", tenantId ?? null],
    queryFn: () => fetchConversations({ data: { tenantId } }),
    enabled: Boolean(tenantId) || !tenantsQ.data?.isSuperadmin,
  });

  // Hidratação do chat ao trocar conversationId
  const messagesQ = useQuery({
    queryKey: ["conv-messages", conversationId],
    queryFn: () => fetchMessages({ data: { conversationId: conversationId! } }),
    enabled: Boolean(conversationId),
  });
  React.useEffect(() => {
    if (!conversationId) return;
    if (messagesQ.data) {
      setMessages(messagesQ.data.messages.map((m) => ({
        id: m.id, role: m.role as "user" | "assistant", content: m.content,
      })));
    }
  }, [conversationId, messagesQ.data]);

  React.useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const m = useMutation({
    mutationFn: (text: string) => chat({ data: { message: text, conversationId, tenantId } }),
    onSuccess: (r) => {
      const wasNew = !conversationId;
      setConversationId(r.conversationId);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: r.reply }]);
      qc.invalidateQueries({ queryKey: ["conversations"] });
      if (!wasNew) {
        qc.invalidateQueries({ queryKey: ["conv-messages", r.conversationId] });
      }
    },
    onError: async (e) => {
      const msg = e instanceof Response ? await e.text() : (e as Error).message;
      toast.error(msg);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: `⚠️ ${msg}` }]);
    },
  });

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || m.isPending) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content }]);
    setInput("");
    m.mutate(content);
  };

  const handleNewConversation = () => {
    setConversationId(undefined);
    setMessages([]);
    setMobileOpen(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSelectConversation = (id: string) => {
    if (id === conversationId) { setMobileOpen(false); return; }
    setConversationId(id);
    setMessages([]);
    setMobileOpen(false);
  };

  const handleDeleted = (id: string) => {
    if (id === conversationId) {
      setConversationId(undefined);
      setMessages([]);
    }
    qc.invalidateQueries({ queryKey: ["conversations"] });
  };

  const isSuperadmin = tenantsQ.data?.isSuperadmin ?? false;
  const tenants = tenantsQ.data?.tenants ?? [];

  const sidebar = (
    <ConversationsSidebar
      conversations={conversationsQ.data?.conversations ?? []}
      isLoading={conversationsQ.isLoading}
      activeId={conversationId}
      onNew={handleNewConversation}
      onSelect={handleSelectConversation}
      onDeleted={handleDeleted}
      removeConversation={removeConversation}
    />
  );

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-[1400px] gap-4">
      {/* Sidebar desktop */}
      <aside className="glass hidden w-[280px] shrink-0 overflow-hidden rounded-2xl md:block">
        {sidebar}
      </aside>

      {/* Sidebar mobile */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[300px] p-0">
          {sidebar}
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <SheetTrigger asChild>
              <button
                onClick={() => setMobileOpen(true)}
                className="glass grid h-9 w-9 place-items-center rounded-lg md:hidden"
                aria-label="Abrir conversas"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Agente IA</h1>
              <p className="mt-1 text-sm text-muted-foreground">Especialista em BI/ERP — consulta seus dados reais do Bling.</p>
            </div>
          </div>
          {isSuperadmin && tenants.length > 0 && (
            <label className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
              <span className="text-muted-foreground">Cliente:</span>
              <select
                className="bg-transparent text-foreground outline-none"
                value={tenantId ?? ""}
                onChange={(e) => {
                  setTenantId(e.target.value);
                  setConversationId(undefined);
                  setMessages([]);
                  try { localStorage.setItem(STORAGE_KEY, e.target.value); } catch { /* noop */ }
                }}
              >
                {tenants.map((t) => (
                  <option key={t.id} value={t.id} className="bg-background">{t.name}</option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div className="glass flex-1 overflow-hidden rounded-2xl">
          <div className="h-full overflow-y-auto p-4 md:p-6">
            {messages.length === 0 && !messagesQ.isLoading && (
              <div className="grid h-full place-items-center">
                <div className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl" style={{ background: "var(--gradient-primary)" }}>
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold">Como posso ajudar hoje?</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Comece com uma das sugestões.</p>
                  <div className="mt-6 grid gap-2 sm:grid-cols-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => send(s)}
                        className="rounded-xl border border-border bg-secondary/30 p-3 text-left text-sm hover:bg-secondary/60"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {messages.map((msg) => <Bubble key={msg.id} m={msg} />)}
              {m.isPending && <ThinkingBubble />}
              <div ref={endRef} />
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="glass mt-4 flex items-center gap-2 rounded-2xl p-2"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo ao agente…"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
            disabled={m.isPending}
          />
          <button
            type="submit"
            disabled={!input.trim() || m.isPending}
            className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground transition disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

type ConvItem = { id: string; title: string; updated_at: string };

function ConversationsSidebar({
  conversations, isLoading, activeId, onNew, onSelect, onDeleted, removeConversation,
}: {
  conversations: ConvItem[];
  isLoading: boolean;
  activeId?: string;
  onNew: () => void;
  onSelect: (id: string) => void;
  onDeleted: (id: string) => void;
  removeConversation: (args: { data: { conversationId: string } }) => Promise<{ ok: boolean }>;
}) {
  const [pendingDelete, setPendingDelete] = React.useState<ConvItem | null>(null);
  const del = useMutation({
    mutationFn: (id: string) => removeConversation({ data: { conversationId: id } }),
    onSuccess: (_r, id) => {
      toast.success("Conversa excluída.");
      onDeleted(id);
      setPendingDelete(null);
    },
    onError: async (e) => {
      const msg = e instanceof Response ? await e.text() : (e as Error).message;
      toast.error(msg);
    },
  });

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3">
        <button
          onClick={onNew}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          style={{ background: "var(--gradient-primary)" }}
        >
          <MessageSquarePlus className="h-4 w-4" />
          Nova Conversa
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <p className="px-3 py-4 text-xs text-muted-foreground">Carregando…</p>
        ) : conversations.length === 0 ? (
          <p className="px-3 py-4 text-xs text-muted-foreground">Nenhuma conversa ainda.</p>
        ) : (
          <ul className="space-y-1">
            {conversations.map((c) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  <div
                    className={cn(
                      "group relative flex items-center gap-2 rounded-lg px-2 py-2 text-sm transition",
                      isActive ? "bg-primary/15 text-foreground" : "hover:bg-secondary/50",
                    )}
                  >
                    <button
                      onClick={() => onSelect(c.id)}
                      className="min-w-0 flex-1 text-left"
                    >
                      <p className="truncate font-medium">{c.title || "Sem título"}</p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {formatRelative(c.updated_at)}
                      </p>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPendingDelete(c); }}
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground opacity-0 transition hover:bg-destructive/15 hover:text-destructive group-hover:opacity-100"
                      aria-label="Excluir conversa"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <AlertDialog open={!!pendingDelete} onOpenChange={(o) => !o && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir conversa?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Todas as mensagens de “{pendingDelete?.title}” serão removidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={del.isPending}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => pendingDelete && del.mutate(pendingDelete.id)}
              disabled={del.isPending}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Bubble({ m }: { m: Msg }) {
  const isUser = m.role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-lg",
        isUser ? "bg-secondary" : "bg-primary/15 text-primary",
      )}>
        {isUser ? <User2 className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
        isUser ? "bg-primary/15 border border-primary/20" : "glass",
      )}>
        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-table:my-2 prose-th:px-2 prose-th:py-1 prose-td:px-2 prose-td:py-1 prose-table:border prose-th:border prose-td:border prose-table:border-border prose-th:border-border prose-td:border-border">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {cleanAssistant(m.content)}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

function ThinkingBubble() {
  return (
    <div className="flex gap-3">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary">
        <Bot className="h-4 w-4" />
      </div>
      <div className="glass rounded-2xl px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-muted-foreground"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
