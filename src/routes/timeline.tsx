import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { dailyEntries, timelineEvents, formatShortDate, getWalkDaysEnergy, getBestDays } from "@/lib/data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/timeline")({
  component: Timeline,
  head: () => ({
    meta: [
      { title: "Buddyguard · Timeline" },
      { name: "description", content: "See your patterns over time with Buddyguard." },
    ],
  }),
});

const chartData = dailyEntries.map((d) => ({
  date: formatShortDate(d.date),
  energy: d.energy,
  stress: d.stress,
  sleep: d.sleep,
  walking: d.walking,
}));

function Timeline() {
  const [investigating, setInvestigating] = useState(false);
  const [patternsVisible, setPatternsVisible] = useState(false);

  const handleInvestigate = () => {
    setInvestigating(true);
    setTimeout(() => {
      setInvestigating(false);
      setPatternsVisible(true);
    }, 1800);
  };

  return (
    <PhoneLayout>
      <div className="space-y-6 pt-2 pb-8">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl">Timeline</h1>
          <p className="text-sm text-muted-foreground">Eight weeks with Buddyguard.</p>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm border border-border/50 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="energy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-forest)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-forest)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={13} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 10]} />
              <Tooltip contentStyle={{ borderRadius: 16, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }} />
              <Area
                type="monotone"
                dataKey="energy"
                stroke="var(--color-forest)"
                strokeWidth={2}
                fill="url(#energy)"
              />
              <Area
                type="monotone"
                dataKey="stress"
                stroke="var(--color-amber)"
                strokeWidth={2}
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap gap-2">
          {timelineEvents.map((event) => (
            <span
              key={event.id}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                event.folder === "oncology"
                  ? "bg-teal-soft text-teal-foreground"
                  : "bg-amber-soft text-amber-foreground"
              }`}
            >
              {event.title}
            </span>
          ))}
        </div>

        {!patternsVisible ? (
          <button
            onClick={handleInvestigate}
            disabled={investigating}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-forest py-3 text-sm font-medium text-primary-foreground hover:bg-forest/90 transition-colors disabled:opacity-70"
          >
            {investigating ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Investigating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                What can you see?
              </>
            )}
          </button>
        ) : (
          <div className="space-y-4">
            <WalkingEnergyCard />
            <BestDaysCard />
            <button
              onClick={() => setPatternsVisible(false)}
              className="w-full rounded-2xl bg-muted py-2.5 text-sm font-medium hover:bg-muted/80 transition-colors"
            >
              Hide patterns
            </button>
          </div>
        )}
      </div>
    </PhoneLayout>
  );
}

function WalkingEnergyCard() {
  const { walk, nonWalk } = getWalkDaysEnergy();
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-4">
      <h3 className="font-serif text-xl">Walking ↔ energy</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-mint p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Days with a walk</p>
          <p className="text-2xl font-serif">{walk.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">avg energy / 10</p>
        </div>
        <div className="rounded-2xl bg-sand p-4 space-y-1">
          <p className="text-xs text-muted-foreground">Days without</p>
          <p className="text-2xl font-serif">{nonWalk.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">avg energy / 10</p>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        On days you logged a walk, your energy averaged {walk.toFixed(1)} out of 10, compared with{" "}
        {nonWalk.toFixed(1)} on days you didn't.
      </p>
      <p className="text-sm font-medium text-forest leading-relaxed">
        This is a possible pattern in your own records. It can't show what caused the change.
      </p>
      <button className="text-sm font-medium text-forest hover:underline">See the entries behind it</button>
    </div>
  );
}

function BestDaysCard() {
  const { sorted, withAllThree } = getBestDays();
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm border border-border/50 space-y-4">
      <h3 className="font-serif text-xl">Your best days</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">
        On your best energy days, these tended to go together:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          Walking 30+ minutes
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          More than 7 hours sleep
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-forest" />
          Stress 3/10 or lower
        </li>
      </ul>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {withAllThree.length} of your {sorted.length} best energy days had all three.
      </p>
      <p className="text-sm font-medium text-forest leading-relaxed">
        This is a possible pattern in your own records. It can't show what caused the change.
      </p>
    </div>
  );
}
