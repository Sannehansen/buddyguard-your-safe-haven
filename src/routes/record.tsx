import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Square } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen w-full bg-forest flex flex-col items-center justify-between p-8 text-primary-foreground">
      <div className="w-full max-w-xs space-y-2 text-center pt-12">
        <p className="text-sm opacity-80">Recording</p>
        <p className="font-serif text-5xl tabular-nums">{formatTime(seconds)}</p>
      </div>

      <div className="flex items-end justify-center gap-1 h-32">
        {Array.from({ length: 24 }).map((_, i) => (
          <AudioBar key={i} active={seconds > 0} delay={i * 40} />
        ))}
      </div>

      <div className="w-full max-w-xs space-y-4">
        <div className="min-h-[180px] space-y-3 rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
          {transcriptChunks.slice(0, visibleChunks).map((chunk, idx) => (
            <div key={idx} className="text-sm leading-relaxed">
              <span className="font-semibold opacity-90">{chunk.speaker}:</span>{" "}
              <span className="opacity-90">{chunk.text}</span>
            </div>
          ))}
          {listening && (
            <p className="text-sm italic opacity-70 animate-pulse">listening…</p>
          )}
        </div>
        <p className="text-center text-xs opacity-70">Your recording is safe.</p>
      </div>

      <button
        aria-label="Stop"
        onClick={() => navigate({ to: "/consultation" })}
        className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
      >
        <Square className="h-6 w-6 fill-current" />
      </button>
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
      className="w-1.5 rounded-full bg-current opacity-80 transition-all duration-150"
      style={{ height: `${height}px` }}
    />
  );
}
