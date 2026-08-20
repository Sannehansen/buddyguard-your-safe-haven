import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mic, ChevronRight, FolderPlus, ShieldCheck } from "lucide-react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { consultations, formatShortDate, patient } from "@/lib/data";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Buddyguard – Your extra ears" },
      {
        name: "description",
        content: "Record your consultations and get a calm, plain-language summary.",
      },
      { property: "og:title", content: "Buddyguard – Your extra ears" },
      {
        property: "og:description",
        content: "Record your consultations and get a calm, plain-language summary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Home() {
  const navigate = useNavigate();
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);
  const [filter, setFilter] = useState<"all" | "oncology" | "gp">("all");

  const recordings = consultations
    .map((c) => ({
      id: c.id,
      title: c.title,
      date: c.date,
      folder: c.folder,
      meta: "12 min",
      to: "/consultation" as const,
    }))
    .filter((r) => filter === "all" || r.folder === filter);

  return (
    <PhoneLayout>
      <div className="flex items-center gap-2 pt-1">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-primary-foreground">
          <ShieldCheck className="h-5 w-5" aria-hidden />
        </span>
        <span className="text-lg font-semibold text-foreground">Buddyguard</span>
      </div>

      <section className="pt-5 text-center">
        <h1 className="font-serif text-3xl text-foreground">Hello, {patient.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {now
            ? now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })
            : "\u00A0"}
        </p>
      </section>

      <section className="mt-5">
        <div className="rounded-3xl bg-sage p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-foreground/10 text-sage-foreground">
              <Mic className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-lg font-semibold text-sage-foreground">
              Record a conversation
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate({ to: "/record" })}
            className="mt-4 inline-flex w-full min-h-12 items-center justify-center gap-2 rounded-2xl bg-forest px-5 text-base font-semibold text-primary-foreground shadow-sm transition-transform active:scale-[0.98]"
          >
            <Mic className="h-5 w-5" aria-hidden />
            Start recording
          </button>
        </div>
      </section>

      <section className="mt-5 flex flex-wrap items-center gap-2">
        {([
          { id: "all", label: "All" },
          { id: "oncology", label: "Oncology" },
          { id: "gp", label: "GP" },
        ] as const).map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => setFilter(chip.id)}
            className={`min-h-9 rounded-full px-4 text-sm font-medium transition-colors ${
              filter === chip.id
                ? "bg-forest text-primary-foreground"
                : "bg-card text-foreground border border-border/60"
            }`}
          >
            {chip.label}
          </button>
        ))}
        <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-dashed border-forest/50 px-3 text-sm text-forest">
          <FolderPlus className="h-4 w-4" aria-hidden />
          New folder
        </span>
      </section>

      <section className="mt-5">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Conversations
        </h2>
        <div className="mt-3 space-y-2">
          {recordings.map((entry) => (
            <Link
              key={entry.id}
              to={entry.to}
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm border border-border/50"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                  entry.folder === "oncology" ? "bg-teal/15 text-teal" : "bg-amber/20 text-amber"
                }`}
              >
                <Mic className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium leading-snug">{entry.title}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {formatShortDate(entry.date)} · {entry.meta}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

    </PhoneLayout>
  );
}
