import { createFileRoute, Link } from "@tanstack/react-router";
import { Mic, Calendar } from "lucide-react";
import { PhoneLayout } from "@/components/PhoneLayout";
import { logEntries, formatShortDate, consultations, patient } from "@/lib/data";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Buddyguard · Home" },
      { name: "description", content: "Your quiet check-in with Buddyguard." },
    ],
  }),
});

function Home() {
  const todayAppointment = {
    title: "Oncology follow-up",
    doctor: "Dr. Chen",
    time: "14:00",
  };

  return (
    <PhoneLayout>
      <div className="space-y-6 pt-2">
        <div className="space-y-1">
          <h1 className="font-serif text-3xl text-foreground">Good morning, {patient.name}</h1>
          <p className="text-sm text-muted-foreground">Thursday, 23-07-2026</p>
        </div>

        <div className="rounded-3xl bg-teal-soft p-5 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-teal-foreground">{todayAppointment.title}</p>
              <p className="text-sm text-teal-foreground/80">
                {todayAppointment.doctor} · {todayAppointment.time}
              </p>
            </div>
            <Calendar className="h-5 w-5 text-teal" />
          </div>
          <Link
            to="/record"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-4 py-2.5 text-sm font-medium text-teal-foreground hover:bg-teal/90 transition-colors"
          >
            <Mic className="h-4 w-4" />
            Record
          </Link>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Last time your doctor mentioned fatigue and the new medication.
        </p>

        <div className="flex flex-col items-center gap-4 py-4">
          <Link
            to="/log"
            className="group relative flex h-28 w-28 items-center justify-center rounded-full bg-forest text-primary-foreground shadow-lg shadow-forest/20 hover:bg-forest/90 transition-all active:scale-95"
          >
            <Mic className="h-10 w-10" />
          </Link>
          <div className="text-center space-y-1">
            <p className="text-base font-medium">Tell Buddyguard</p>
            <p className="text-xs text-muted-foreground">A few words is enough</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Recent
          </p>
          <div className="space-y-3">
            {logEntries.slice(0, 3).map((entry) => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </PhoneLayout>
  );
}
