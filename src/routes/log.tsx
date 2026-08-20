import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, Check, Pencil, X } from "lucide-react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { Slider } from "@/components/ui/slider";
import { logEntries, formatShortDate } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/log")({
  component: Log,
  head: () => ({
    meta: [
      { title: "Buddyguard · Log" },
      { name: "description", content: "Log how you're doing with Buddyguard." },
    ],
  }),
});

function Log() {
  const [mode, setMode] = useState<"idle" | "recording" | "confirm" | "followup" | "done">("idle");
  const [quickOpen, setQuickOpen] = useState(false);

  return (
    <PhoneLayout>
      <div className="space-y-6 pt-2 pb-8">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl">Log</h1>
          <p className="text-sm text-muted-foreground">A few words is enough.</p>
        </div>

        {mode === "idle" && (
          <>
            <div className="flex items-center gap-3 rounded-3xl bg-white p-3 shadow-sm border border-border/50">
              <input
                type="text"
                placeholder="How are you today?"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                aria-label="Record"
                onClick={() => setMode("recording")}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-primary-foreground hover:bg-forest/90 transition-colors"
              >
                <Mic className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => setQuickOpen((s) => !s)}
              className="text-sm font-medium text-forest hover:underline"
            >
              {quickOpen ? "Hide quick log" : "Quick log instead"}
            </button>

            {quickOpen && <QuickLog />}
          </>
        )}

        {mode === "recording" && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-forest/10">
              <div className="h-16 w-16 rounded-full bg-forest animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Listening…</p>
            <button
              onClick={() => setMode("confirm")}
              className="rounded-2xl bg-forest px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-forest/90 transition-colors"
            >
              Stop
            </button>
          </div>
        )}

        {mode === "confirm" && (
          <ConfirmCard
            onYes={() => setMode("followup")}
            onEdit={() => setMode("idle")}
          />
        )}

        {mode === "followup" && (
          <FollowupCard onDone={() => setMode("done")} />
        )}

        {mode === "done" && (
          <div className="rounded-3xl bg-mint p-5 text-center space-y-2">
            <p className="text-sm font-medium">Saved.</p>
            <p className="text-xs text-muted-foreground">Buddyguard will remember this.</p>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Your entries
          </p>
          <div className="space-y-3">
            {logEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl bg-white p-4 shadow-sm border border-border/50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{entry.title}</p>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      entry.folder === "oncology" ? "bg-teal" : "bg-amber"
                    }`}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{formatShortDate(entry.date)}</p>
                {entry.metrics && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.metrics.energy !== undefined && (
                      <MetricPill label="Energy" value={entry.metrics.energy} />
                    )}
                    {entry.metrics.stress !== undefined && (
                      <MetricPill label="Stress" value={entry.metrics.stress} />
                    )}
                    {entry.metrics.sleep !== undefined && (
                      <MetricPill label="Sleep" value={`${entry.metrics.sleep}h`} />
                    )}
                    {entry.metrics.walking !== undefined && (
                      <MetricPill label="Walk" value={`${entry.metrics.walking}m`} />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneLayout>
  );
}

function QuickLog() {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-5">
      <SliderField label="Energy" defaultValue={[6]} />
      <SliderField label="Stress" defaultValue={[3]} />
      <SliderField label="Pain" defaultValue={[2]} />
      <div className="space-y-2">
        <label className="text-sm font-medium">Sleep</label>
        <input
          type="number"
          defaultValue="7.5"
          step="0.5"
          className="w-full rounded-2xl border border-input bg-muted px-4 py-2 text-sm outline-none"
        />
      </div>
      <button className="w-full rounded-2xl bg-forest py-2.5 text-sm font-medium text-primary-foreground hover:bg-forest/90 transition-colors">
        Save quick log
      </button>
    </div>
  );
}

function SliderField({ label, defaultValue }: { label: string; defaultValue: number[] }) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm text-muted-foreground">{value[0]}/10</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={10} step={1} />
    </div>
  );
}

function ConfirmCard({ onYes, onEdit }: { onYes: () => void; onEdit: () => void }) {
  const [energy, setEnergy] = useState([7]);
  const [stress, setStress] = useState([3]);
  const [walking, setWalking] = useState([30]);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-5">
      <p className="font-serif text-xl">I noted three things. Right?</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Walked 30 minutes</p>
          <Slider value={walking} onValueChange={setWalking} max={120} step={5} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Energy felt higher</p>
          <Slider value={energy} onValueChange={setEnergy} max={10} step={1} />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Stress low</p>
          <Slider value={stress} onValueChange={setStress} max={10} step={1} />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onYes}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-forest py-2.5 text-sm font-medium text-primary-foreground hover:bg-forest/90 transition-colors"
        >
          <Check className="h-4 w-4" />
          Yes
        </button>
        <button
          onClick={onEdit}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-muted py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );
}

function FollowupCard({ onDone }: { onDone: () => void }) {
  const [value, setValue] = useState([3]);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-5">
      <p className="text-sm text-muted-foreground leading-relaxed">
        You didn't mention nausea — anything there?
      </p>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Nausea</label>
          <span className="text-sm text-muted-foreground">{value[0]}/10</span>
        </div>
        <Slider value={value} onValueChange={setValue} max={10} step={1} />
      </div>
      <div className="flex gap-3">
        <button
          onClick={onDone}
          className="flex-1 rounded-2xl bg-forest py-2.5 text-sm font-medium text-primary-foreground hover:bg-forest/90 transition-colors"
        >
          Answer
        </button>
        <button
          onClick={onDone}
          className="flex-1 rounded-2xl bg-muted py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          Not today
        </button>
      </div>
    </div>
  );
}

function MetricPill({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium">
      {label}: {value}
    </span>
  );
}
