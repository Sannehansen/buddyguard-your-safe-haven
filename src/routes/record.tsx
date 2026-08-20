import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Square, Info } from "lucide-react";

export const Route = createFileRoute("/record")({
  component: Record,
  head: () => ({
    meta: [
      { title: "Buddyguard · Recording" },
      { name: "description", content: "Recording a consultation with Buddyguard." },
    ],
  }),
});

const transcriptChunks = [
  { speaker: "Dr. Chen", text: "How have you been since the last cycle?" },
  { speaker: "Anna", text: "Better, actually. I've been going for walks." },
  { speaker: "Dr. Chen", text: "That's good to hear. The fatigue is still there?" },
  { speaker: "Anna", text: "Yes, but I rest when I need to." },
  { speaker: "Dr. Chen", text: "Keep taking the magnesium. We'll review the scan next time." },
];

function Record() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [visibleChunks, setVisibleChunks] = useState(0);
  const [listening, setListening] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const chunkInterval = setInterval(() => {
      setListening(true);
      setTimeout(() => {
        setVisibleChunks((n) => {
          if (n >= transcriptChunks.length) {
            clearInterval(chunkInterval);
            return n;
          }
          setListening(false);
          return n + 1;
        });
      }, 900);
    }, 2800);

    return () => clearInterval(chunkInterval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleChunks, listening]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m.toString().padStart(2, "0")}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-full bg-ivory text-ivory-foreground flex flex-col px-6 pt-10 pb-8">
      <div className="text-center space-y-4">
        <h1 className="font-serif text-2xl text-forest">Buddyguard is listening</h1>
        <div className="inline-flex items-center rounded-full bg-sand px-7 py-2">
          <span className="font-serif text-3xl tabular-nums text-forest">{formatTime(seconds)}</span>
        </div>
        <div className="flex items-end justify-center gap-1 h-10">
          {Array.from({ length: 14 }).map((_, i) => (
            <AudioBar key={i} active delay={i * 40} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex-1 min-h-0 flex flex-col">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Live transcript
        </p>
        <div
          ref={scrollRef}
          className="flex-1 min-h-[220px] overflow-y-auto space-y-3 rounded-3xl border border-sage/40 bg-card p-5 shadow-sm"
        >
          {visibleChunks === 0 && !listening && (
            <p className="text-sm text-muted-foreground">Waiting for the conversation to start…</p>
          )}
          {transcriptChunks.slice(0, visibleChunks).map((chunk, idx) => (
            <div key={idx} className="text-sm leading-relaxed">
              <span className="font-semibold text-forest">{chunk.speaker}:</span>{" "}
              <span className="text-foreground/80">{chunk.text}</span>
            </div>
          ))}
          {listening && (
            <p className="flex items-center gap-1 text-sm italic text-muted-foreground">
              <span className="animate-pulse">dictating…</span>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-mint px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
        <p className="text-sm leading-snug text-forest">
          Place the phone between you so both voices are picked up clearly.
        </p>
      </div>

      <button
        aria-label="Stop"
        onClick={() => navigate({ to: "/consultation" })}
        className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-destructive px-6 py-4 text-base font-semibold text-destructive-foreground transition-opacity hover:opacity-90"
      >
        <Square className="h-4 w-4 fill-current" />
        Stop recording
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        The recording is stored on your phone
      </p>
    </div>
  );
}

function AudioBar({ active, delay }: { active: boolean; delay: number }) {
  const [height, setHeight] = useState(20);

  useEffect(() => {
    if (!active) return;
    const update = () => {
      setHeight(Math.max(12, Math.min(100, 30 + Math.random() * 70)));
    };
    const id = setInterval(update, 180 + Math.random() * 120);
    setTimeout(update, delay);
    return () => clearInterval(id);
  }, [active, delay]);

  return (
    <div
      className="w-1.5 rounded-full bg-forest opacity-80 transition-all duration-150"
      style={{ height: `${Math.round(height * 0.4)}px` }}
    />
  );
}
