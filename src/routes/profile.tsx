import { createFileRoute } from "@tanstack/react-router";
import { PhoneLayout } from "@/components/PhoneLayout";
import { patient } from "@/lib/data";
import {
  ChevronRight,
  FileLock,
  Languages,
  LogOut,
  MessageSquare,
  ScanFace,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  component: Profile,
  head: () => ({
    meta: [
      { title: "Buddyguard · Profile" },
      { name: "description", content: "Your Buddyguard profile, privacy and account settings." },
      { property: "og:title", content: "Buddyguard · Profile" },
      {
        property: "og:description",
        content: "Manage language, privacy and account settings in Buddyguard.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function Profile() {
  const [faceId, setFaceId] = useState(true);

  return (
    <PhoneLayout>
      <div className="space-y-7 pb-8 pt-2">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-forest text-2xl font-medium text-primary-foreground">
            {patient.name[0]}
          </div>
          <h1 className="font-serif text-2xl">{patient.name} Nielsen</h1>
          <p className="text-sm text-muted-foreground">anna@example.com</p>
        </div>

        <Group title="Settings">
          <Row icon={Languages} label="Language" value="English" />
          <Row
            icon={ScanFace}
            label="Open app with Face ID"
            trailing={
              <button
                aria-label="Toggle Face ID"
                onClick={() => setFaceId((v) => !v)}
                className={cn(
                  "relative h-6 w-11 rounded-full transition-colors",
                  faceId ? "bg-forest" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all",
                    faceId ? "left-[22px]" : "left-0.5"
                  )}
                />
              </button>
            }
          />
        </Group>

        <Group title="Privacy">
          <Row icon={ShieldCheck} label="Your consent" />
          <Row icon={FileLock} label="Privacy policy" />
          <Row icon={MessageSquare} label="Send feedback" />
        </Group>

        <Group title="Account">
          <Row icon={UserCog} label="Account settings" />
          <Row icon={LogOut} label="Log out" />
          <Row icon={Trash2} label="Delete account and all data" destructive />
        </Group>
      </div>
    </PhoneLayout>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <p className="px-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="divide-y divide-border/60 overflow-hidden rounded-2xl bg-card shadow-sm">
        {children}
      </div>
    </section>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  trailing,
  destructive,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value?: string;
  trailing?: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <Icon className={cn("h-4 w-4", destructive ? "text-destructive" : "text-forest")} />
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-medium", destructive && "text-destructive")}>{label}</p>
        {value && <p className="text-xs text-muted-foreground">{value}</p>}
      </div>
      {trailing ?? (
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/profile"!</div>
}
