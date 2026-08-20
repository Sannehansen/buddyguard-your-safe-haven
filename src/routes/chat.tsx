import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { askAssistant } from "@/lib/chat.functions";
import {
  patient,
  dailyEntries,
  logEntries,
  consultations,
  suggestedQuestions,
  getWalkDaysEnergy,
  getBestDays,
} from "@/lib/data";

export const Route = createFileRoute("/chat")({
  component: Chat,
  head: () => ({
    meta: [
      { title: "Buddyguard · Ask your assistant" },
      {
        name: "description",
        content: "Ask Buddyguard about your own logged energy, sleep and consultations.",
      },
      { property: "og:title", content: "Buddyguard · Ask your assistant" },
      {
        property: "og:description",
        content: "A calm patient assistant that answers from your own health log.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type Msg = { role: "user" | "assistant"; content: string };

function buildContext() {
  const walk = getWalkDaysEnergy();
  const best = getBestDays();
  const recent = dailyEntries.slice(-21);
  return [
    `Patient: ${patient.name}, ${patient.age}, ${patient.condition}, ${patient.weeksWithApp} weeks of logging.`,
    `Average energy on walking days (>=20 min): ${walk.walk.toFixed(1)}/10; on non-walking days: ${walk.nonWalk.toFixed(1)}/10.`,
    `Best-energy days often combine sleep >7h, a 30 min walk and low stress (${best.withAllThree.length} of the top 6 days).`,
    "Recent daily entries (date, energy, fatigue, pain, stress, sleep h, walk min):",
    ...recent.map(
      (d) =>
        `${d.date}: E${d.energy} F${d.fatigue} P${d.pain} S${d.stress} Sl${d.sleep} W${d.walking}`,
    ),
    "Logs:",
    ...logEntries.map((l) => `${l.date} [${l.folder}] ${l.title}${l.notes ? ` — ${l.notes}` : ""}`),
    "Consultations:",
    ...consultations.map((c) => `${c.date} [${c.folder}] ${c.title}: ${c.summary}`),
  ].join("\n");
}

function Chat() {
  const ask = useServerFn(askAssistant);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content: `Hi ${patient.name}. I'm here between visits. Ask me anything about how you've been feeling — I only look at what you've logged.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await ask({
        data: {
          messages: next.filter((m, i) => i > 0 || m.role === "user"),
          context: buildContext(),
        },
      });
      setMessages([...next, { role: "assistant", content: res.text }]);
    } catch {
      setError("Buddyguard couldn't answer right now. Please try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PhoneLayout>
      <div className="flex h-full flex-col pt-2">
        <div className="space-y-1 pb-4">
          <h1 className="font-serif text-3xl text-foreground">Ask Buddyguard</h1>
          <p className="text-sm text-muted-foreground">
            Your patient assistant, based on your own log.
          </p>
        </div>

        <div className="flex-1 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
              <p
                className={
                  m.role === "user"
                    ? "max-w-[85%] rounded-3xl rounded-br-lg bg-forest px-4 py-3 text-sm leading-relaxed text-primary-foreground"
                    : "max-w-[92%] text-sm leading-relaxed text-foreground"
                }
              >
                {m.content}
              </p>
            </div>
          ))}

          {loading && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Thinking…
            </p>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {suggestedQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => void send(q)}
                  className="rounded-full border border-border bg-white px-3 py-2 text-xs text-foreground hover:bg-mint transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
          className="sticky bottom-0 flex items-center gap-2 bg-ivory py-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your energy, sleep, visits…"
            className="flex-1 rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-forest"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-primary-foreground disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PhoneLayout>
  );
}
