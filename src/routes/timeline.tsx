import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { dailyEntries, timelineEvents, logEntries, formatShortDate, formatDate, getWalkDaysEnergy, getBestDays } from "@/lib/data";
import type { Folder, LogEntry, TimelineEvent } from "@/lib/data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Sparkles, Calendar, Mic, Pill, Footprints, Building2, ScanLine, MessageSquare, Stethoscope, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleInvestigate = () => {
    setInvestigating(true);
    setTimeout(() => {
      setInvestigating(false);
      setPatternsVisible(true);
    }, 1800);
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
    const chartEl = document.getElementById("timeline-chart");
    chartEl?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const selectedDay = selectedDate ? dailyEntries.find((d) => d.date === selectedDate) : null;

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

        <section className="space-y-4 pt-2">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl">Chronological log</h2>
            <p className="text-sm text-muted-foreground">Newest first. Tap an entry to see where it falls on the graph.</p>
          </div>
          <div className="rounded-3xl bg-white shadow-sm border border-border/50 divide-y divide-border/50">
            {chronologicalLog.map((item) => (
              <LogListItem key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </PhoneLayout>
  );
}

type LogListItemData =
  | ({ kind: "event" } & TimelineEvent)
  | ({ kind: "log" } & LogEntry);

const chronologicalLog: LogListItemData[] = [
  ...timelineEvents.map((e) => ({ ...e, kind: "event" as const })),
  ...logEntries.map((l) => ({ ...l, kind: "log" as const })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function eventIcon(kind: "event" | "log", icon?: string, type?: LogEntry["type"]) {
  const props = { className: "h-4 w-4" };
  if (kind === "log") {
    if (type === "quick") return <Calendar {...props} />;
    if (type === "document") return <FileText {...props} />;
    return <Mic {...props} />;
  }
  switch (icon) {
    case "stethoscope":
      return <Stethoscope {...props} />;
    case "footprints":
      return <Footprints {...props} />;
    case "pill":
      return <Pill {...props} />;
    case "building":
      return <Building2 {...props} />;
    case "scan":
      return <ScanLine {...props} />;
    case "message":
      return <MessageSquare {...props} />;
    default:
      return <Calendar {...props} />;
  }
}

function LogListItem({ item }: { item: LogListItemData }) {
  const isEvent = item.kind === "event";
  const title = isEvent ? item.title : item.title;
  const subtitle = isEvent ? item.subtitle : item.notes;
  const folder = item.folder;

  return (
    <div className="flex items-start gap-3 p-4">
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          folder === "oncology" ? "bg-teal-soft text-teal-foreground" : "bg-amber-soft text-amber-foreground"
        )}
      >
        {eventIcon(item.kind, isEvent ? item.icon : undefined, !isEvent ? item.type : undefined)}
      </div>
      <div className="min-w-0 flex-1 space-y-0.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium truncate">{title}</p>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">{formatDate(item.date)}</span>
        </div>
        {subtitle && <p className="text-sm text-muted-foreground line-clamp-2">{subtitle}</p>}
      </div>
    </div>
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
