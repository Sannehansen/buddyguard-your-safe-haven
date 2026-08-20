import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mic, ChevronRight, HelpCircle } from "lucide-react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { logEntries, formatShortDate, patient } from "@/lib/data";
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

  const latest = logEntries.slice(0, 3);

  return (
    <PhoneLayout>
      <section className="pt-2 text-center">
        <h1 className="font-serif text-3xl text-foreground">Welcome, {patient.name}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {now
            ? now.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
            : "\u00A0"}
        </p>
      </section>

      <section className="mt-6">
        <div className="rounded-3xl bg-sage p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-sage-foreground/10 text-sage-foreground">
              <Mic className="h-6 w-6" aria-hidden />
            </span>
            <p className="text-lg font-semibold text-sage-foreground">
              Going to see the doctor?
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

      <section className="mt-8">
        <h2 className="px-1 text-sm font-semibold text-foreground">Latest</h2>
        <div className="mt-3 space-y-2">
          {latest.map((entry) => (
            <Link
              key={entry.id}
              to="/log"
              className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm border border-border/50"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  entry.folder === "oncology" ? "bg-teal" : "bg-amber"
                }`}
              />
              <span className="flex-1">
                <span className="block text-sm font-medium">{entry.title}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {formatShortDate(entry.date)}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <Link
          to="/chat"
          className="flex w-full items-center gap-3 rounded-2xl bg-sage/60 p-4 text-left transition-colors hover:bg-sage/80"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card text-forest">
            <HelpCircle className="h-5 w-5" aria-hidden />
          </span>
          <span className="flex-1 text-sm font-medium text-sage-foreground">
            How does Buddyguard work?
          </span>
          <ChevronRight className="h-5 w-5 text-sage-foreground" aria-hidden />
        </Link>
      </section>
    </PhoneLayout>
  );
}
