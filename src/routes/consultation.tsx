import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { consultations, formatDate } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  component: Consultation,
  head: () => ({
    meta: [
      { title: "Buddyguard · Consultation" },
      { name: "description", content: "Your consultation summary from Buddyguard." },
    ],
  }),
});

function Consultation() {
  const [showTranscript, setShowTranscript] = useState(false);
  const [activeTerm, setActiveTerm] = useState<{ line: number; term: string } | null>(null);
  const consultation = consultations[0]!;

  return (
    <PhoneLayout>
      <div className="space-y-6 pt-2 pb-8">
        <div className="space-y-1">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {formatDate(consultation.date)}
          </p>
          <h1 className="font-serif text-3xl">{consultation.title}</h1>
        </div>

        <div className="rounded-3xl bg-teal-soft p-5 space-y-4">
          <p className="text-xs font-semibold tracking-widest text-teal-foreground uppercase">
            Three things to watch
          </p>
          <ul className="space-y-2">
            {consultation.watchItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-teal-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{consultation.summary}</p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">What it means</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{consultation.whatItMeans}</p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Next steps</h2>
          <ul className="space-y-2">
            {consultation.nextSteps.map((step) => (
              <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
                {step}
              </li>
            ))}
          </ul>
        </section>

        <button
          onClick={() => setShowTranscript((s) => !s)}
          className="w-full flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Full transcript
          {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showTranscript && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-4">
            {consultation.transcript.map((line, lineIdx) => (
              <div key={lineIdx} className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-medium text-forest">{line.time}</span>
                  <span className="text-xs font-semibold text-foreground">{line.speaker}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {line.terms
                    ? renderTextWithTerms(line.text, line.terms, lineIdx, activeTerm, setActiveTerm)
                    : line.text}
                </p>
                {line.terms?.map((t) =>
                  activeTerm?.line === lineIdx && activeTerm?.term === t.word ? (
                    <div
                      key={t.word}
                      className="rounded-2xl bg-mint p-4 space-y-2"
                    >
                      <p className="text-sm font-semibold text-foreground">{t.word}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t.explanation}
                      </p>
                      <p className="text-xs text-forest font-medium">Ask more →</p>
                    </div>
                  ) : null
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PhoneLayout>
  );
}

function renderTextWithTerms(
  text: string,
  terms: { word: string; explanation: string }[],
  lineIdx: number,
  activeTerm: { line: number; term: string } | null,
  setActiveTerm: (t: { line: number; term: string } | null) => void
) {
  const parts = text.split(new RegExp(`(${terms.map((t) => t.word).join("|")})`, "gi"));

  return parts.map((part, i) => {
    const term = terms.find((t) => t.word.toLowerCase() === part.toLowerCase());
    if (term) {
      const isActive = activeTerm?.line === lineIdx && activeTerm?.term === term.word;
      return (
        <button
          key={i}
          onClick={() =>
            setActiveTerm(isActive ? null : { line: lineIdx, term: term.word })
          }
          className={cn(
            "border-b-2 border-dotted border-forest/60 hover:border-forest transition-colors",
            isActive && "border-forest"
          )}
        >
          {part}
        </button>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
