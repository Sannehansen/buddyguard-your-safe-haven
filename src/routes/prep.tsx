import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { careFolders, formatDate, dailyEntries, logEntries } from "@/lib/data";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/prep")({
  component: Prep,
  head: () => ({
    meta: [
      { title: "Buddyguard · Prep" },
      { name: "description", content: "Prepare for your next visit with Buddyguard." },
    ],
  }),
});

function Prep() {
  const [folder, setFolder] = useState<"oncology" | "gp">("oncology");
  const [showRaw, setShowRaw] = useState(false);

  const startDate = dailyEntries[0]!.date;
  const endDate = dailyEntries[dailyEntries.length - 1]!.date;

  return (
    <PhoneLayout>
      <div className="space-y-6 pt-2 pb-8">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl">Prep for next visit</h1>
          <p className="text-sm text-muted-foreground">A clean summary to bring with you.</p>
        </div>

        <div className="flex rounded-2xl bg-muted p-1">
          {careFolders.map((f) => (
            <button
              key={f.id}
              onClick={() => setFolder(f.id)}
              className={cn(
                "flex-1 rounded-xl py-2 text-xs font-medium transition-colors",
                folder === f.id
                  ? f.id === "oncology"
                    ? "bg-teal text-teal-foreground"
                    : "bg-amber text-amber-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Period</h2>
          <p className="text-sm text-muted-foreground">
            {formatDate(startDate)} – {formatDate(endDate)} · {dailyEntries.length} daily entries ·{" "}
            {logEntries.length} logs
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">How it's been</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Energy has been rising over the past two weeks. Walking has become a regular habit.
            Fatigue still varies, especially around treatment days.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-4">
          <h2 className="font-serif text-xl">What to watch</h2>
          <ul className="space-y-3">
            <WatchItem
              label="Fatigue"
              code="R53.83"
              note="Still varies. Worse in days 2–4 after chemo."
            />
            <WatchItem
              label="Nausea"
              code="R11.2"
              note="Mild. Usually manageable with prescribed medication."
            />
            <WatchItem
              label="Dizziness"
              code="R42"
              note="Reported once this week. Worth mentioning."
            />
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Medication & changes</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
              Magnesium started 01-07-2026
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
              Current treatment cycle continuing
            </li>
          </ul>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Possible patterns</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Days with a walk averaged higher energy. Best energy days often included 7+ hours
            sleep and lower stress.
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
          <h2 className="font-serif text-xl">Questions I could ask</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
              Should I keep tracking fatigue the same way?
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
              Is the dizziness likely related to treatment?
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-forest" />
              When will we review the scan results together?
            </li>
          </ul>
        </section>

        <button
          onClick={() => setShowRaw((s) => !s)}
          className="w-full flex items-center justify-between rounded-2xl bg-muted px-4 py-3 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Raw entries
          {showRaw ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        {showRaw && (
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-3">
            {logEntries.map((entry) => (
              <div key={entry.id} className="text-sm text-muted-foreground border-b border-border/50 last:border-0 pb-2 last:pb-0">
                <p className="font-medium text-foreground">{entry.title}</p>
                <p>{formatDate(entry.date)}</p>
              </div>
            ))}
          </div>
        )}

        <button className="w-full flex items-center justify-center gap-2 rounded-2xl border border-input bg-white py-3 text-sm font-medium hover:bg-muted transition-colors">
          <Copy className="h-4 w-4" />
          Copy as structured data
        </button>
      </div>
    </PhoneLayout>
  );
}

function WatchItem({ label, code, note }: { label: string; code: string; note: string }) {
  return (
    <li className="space-y-1">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{label}</p>
        <span className="text-[10px] font-mono text-muted-foreground">{code}</span>
      </div>
      <p className="text-sm text-muted-foreground">{note}</p>
    </li>
  );
}
