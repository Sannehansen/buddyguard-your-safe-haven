import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { consultations, formatDate } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, Languages, Pencil, Share2, Trash2, Volume2 } from "lucide-react";

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
  const navigate = useNavigate();
  const [tab, setTab] = useState<"summary" | "transcript">("summary");
  const [activeTerm, setActiveTerm] = useState<{ line: number; term: string } | null>(null);
  const consultation = consultations[0]!;
  const summaryPoints = consultation.summary
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <PhoneLayout>
      <div className="space-y-5 pt-2 pb-8">
        <div className="flex items-start gap-2">
          <button
            aria-label="Back"
            onClick={() => navigate({ to: "/" })}
            className="mt-1 shrink-0 text-forest"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-serif text-xl">{consultation.title}</h1>
            <p className="text-xs text-muted-foreground">{formatDate(consultation.date)}</p>
          </div>
          <button aria-label="Rename" className="mt-1 text-muted-foreground">
            <Pencil className="h-4 w-4" />
          </button>
          <button aria-label="Share" className="mt-1 text-muted-foreground">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex rounded-full bg-muted p-1">
          {(["summary", "transcript"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors",
                tab === t ? "bg-forest text-primary-foreground" : "text-muted-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "summary" ? (
          <div className="space-y-4">
            <section className="overflow-hidden rounded-2xl border-l-4 border-forest bg-mint p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-forest">
                Summary
              </p>
              <ul className="space-y-3">
                {summaryPoints.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-relaxed text-forest">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border-l-4 border-amber bg-amber-soft p-5">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-foreground">
                What does it mean?
              </p>
              <p className="text-sm leading-relaxed text-amber-foreground">
                {consultation.whatItMeans}
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Next steps
              </p>
              <ul className="space-y-2">
                {consultation.nextSteps.map((step) => (
                  <li key={step} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card p-5 shadow-sm">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Things to watch
              </p>
              <ul className="space-y-2">
                {consultation.watchItems.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="divide-y divide-border/60 rounded-2xl border border-border/50 bg-card px-5 shadow-sm">
            {consultation.transcript.map((line, lineIdx) => (
              <div key={lineIdx} className="space-y-1.5 py-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-forest">
                    {line.speaker}
                  </span>
                  <span className="text-[11px] tabular-nums text-muted-foreground">{line.time}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85">
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

        <div className="flex items-center justify-between gap-2 rounded-2xl border border-border/50 bg-card px-3 py-3 text-xs">
          <button className="flex flex-1 items-center justify-center gap-1.5 text-destructive">
            <Trash2 className="h-4 w-4" /> Delete
          </button>
          <span className="h-5 w-px bg-border" />
          <button className="flex flex-1 items-center justify-center gap-1.5 text-muted-foreground">
            <Languages className="h-4 w-4" /> Translate
          </button>
          <span className="h-5 w-px bg-border" />
          <button className="flex flex-1 items-center justify-center gap-1.5 text-muted-foreground">
            <Volume2 className="h-4 w-4" /> Audio
          </button>
        </div>
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
