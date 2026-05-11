import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bot, Send, Sparkles, User2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { chatWithAgent } from "@/lib/agent.functions";
import { listTenantsForSelector } from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/agent")({
  component: AgentPage,
});

const STORAGE_KEY = "tecsperts.activeTenantId";

type Msg = { id: string; role: "user" | "assistant"; content: string };

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
  const endRef = React.useRef<HTMLDivElement>(null);
  const chat = useServerFn(chatWithAgent);

  React.useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const m = useMutation({
    mutationFn: (text: string) => chat({ data: { message: text, conversationId } }),
    onSuccess: (r) => {
      setConversationId(r.conversationId);
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "assistant", content: r.reply }]);
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

  return (
    <div className="mx-auto flex h-[calc(100vh-7rem)] max-w-4xl flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">Agente IA</h1>
        <p className="mt-1 text-sm text-muted-foreground">Especialista em BI/ERP — consulta seus dados reais do Bling.</p>
      </div>

      <div className="glass flex-1 overflow-hidden rounded-2xl">
        <div className="h-full overflow-y-auto p-4 md:p-6">
          {messages.length === 0 && (
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
        <div className="prose prose-invert prose-sm max-w-none prose-p:my-1">
          <ReactMarkdown>{m.content}</ReactMarkdown>
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
