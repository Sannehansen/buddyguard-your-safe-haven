export type Folder = "oncology" | "gp";

export type DailyEntry = {
  date: string; // yyyy-mm-dd
  energy: number;
  fatigue: number;
  pain: number;
  stress: number;
  sleep: number;
  walking: number;
};

export type LogEntry = {
  id: string;
  date: string;
  folder: Folder;
  type: "voice" | "quick" | "document" | "consultation";
  title: string;
  notes?: string;
  metrics?: Partial<Pick<DailyEntry, "energy" | "stress" | "pain" | "sleep" | "walking">>;
};

export type TimelineEvent = {
  id: string;
  date: string;
  folder: Folder;
  icon: string;
  title: string;
  subtitle?: string;
  detail?: string;
};

export type Consultation = {
  id: string;
  date: string;
  folder: Folder;
  title: string;
  summary: string;
  whatItMeans: string;
  nextSteps: string[];
  watchItems: string[];
  transcript: TranscriptLine[];
};

export type TranscriptLine = {
  speaker: "Dr. Chen" | "Anna";
  text: string;
  time: string;
  terms?: { word: string; explanation: string }[];
};

export const patient = {
  name: "Anna",
  age: 58,
  condition: "Breast cancer",
  weeksWithApp: 8,
};

export const careFolders: { id: Folder; label: string }[] = [
  { id: "oncology", label: "Oncology" },
  { id: "gp", label: "GP" },
];

export const dailyEntries: DailyEntry[] = [
  // Week 1
  { date: "2026-06-01", energy: 5, fatigue: 6, pain: 2, stress: 5, sleep: 6.5, walking: 0 },
  { date: "2026-06-02", energy: 4, fatigue: 7, pain: 2, stress: 5, sleep: 6.0, walking: 0 },
  { date: "2026-06-03", energy: 4, fatigue: 7, pain: 3, stress: 4, sleep: 5.8, walking: 0 },
  { date: "2026-06-04", energy: 3, fatigue: 8, pain: 3, stress: 5, sleep: 5.5, walking: 0 },
  { date: "2026-06-05", energy: 3, fatigue: 8, pain: 4, stress: 4, sleep: 5.5, walking: 10 },
  { date: "2026-06-06", energy: 4, fatigue: 7, pain: 3, stress: 4, sleep: 6.2, walking: 10 },
  { date: "2026-06-07", energy: 4, fatigue: 7, pain: 3, stress: 4, sleep: 6.4, walking: 15 },
  // Week 2
  { date: "2026-06-08", energy: 4, fatigue: 6, pain: 3, stress: 4, sleep: 6.5, walking: 15 },
  { date: "2026-06-09", energy: 5, fatigue: 6, pain: 2, stress: 4, sleep: 6.8, walking: 20 },
  { date: "2026-06-10", energy: 5, fatigue: 5, pain: 2, stress: 3, sleep: 7.0, walking: 25 },
  { date: "2026-06-11", energy: 6, fatigue: 5, pain: 2, stress: 3, sleep: 7.1, walking: 25 },
  { date: "2026-06-12", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.2, walking: 30 },
  { date: "2026-06-13", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.3, walking: 30 },
  { date: "2026-06-14", energy: 7, fatigue: 4, pain: 1, stress: 3, sleep: 7.4, walking: 35 },
  // Week 3
  { date: "2026-06-15", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.2, walking: 30 },
  { date: "2026-06-16", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.5, walking: 35 },
  { date: "2026-06-17", energy: 7, fatigue: 3, pain: 1, stress: 2, sleep: 7.5, walking: 40 },
  { date: "2026-06-18", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.0, walking: 30 },
  { date: "2026-06-19", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 6.8, walking: 25 },
  { date: "2026-06-20", energy: 7, fatigue: 3, pain: 1, stress: 2, sleep: 7.6, walking: 35 },
  { date: "2026-06-21", energy: 7, fatigue: 3, pain: 1, stress: 2, sleep: 7.7, walking: 40 },
  // Week 4
  { date: "2026-06-22", energy: 5, fatigue: 5, pain: 2, stress: 4, sleep: 6.5, walking: 20 },
  { date: "2026-06-23", energy: 4, fatigue: 6, pain: 3, stress: 4, sleep: 6.2, walking: 10 },
  { date: "2026-06-24", energy: 3, fatigue: 8, pain: 3, stress: 5, sleep: 5.5, walking: 0 },
  { date: "2026-06-25", energy: 3, fatigue: 8, pain: 3, stress: 5, sleep: 5.8, walking: 0 },
  { date: "2026-06-26", energy: 4, fatigue: 7, pain: 3, stress: 5, sleep: 6.0, walking: 10 },
  { date: "2026-06-27", energy: 3, fatigue: 8, pain: 3, stress: 9, sleep: 5.5, walking: 0 },
  { date: "2026-06-28", energy: 3, fatigue: 8, pain: 3, stress: 8, sleep: 5.5, walking: 0 },
  // Week 5
  { date: "2026-06-29", energy: 4, fatigue: 7, pain: 3, stress: 6, sleep: 6.2, walking: 15 },
  { date: "2026-06-30", energy: 5, fatigue: 6, pain: 2, stress: 5, sleep: 6.5, walking: 20 },
  { date: "2026-07-01", energy: 5, fatigue: 5, pain: 2, stress: 4, sleep: 7.0, walking: 25 },
  { date: "2026-07-02", energy: 6, fatigue: 5, pain: 2, stress: 4, sleep: 7.1, walking: 30 },
  { date: "2026-07-03", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.3, walking: 30 },
  { date: "2026-07-04", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.5, walking: 35 },
  { date: "2026-07-05", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.4, walking: 30 },
  // Week 6
  { date: "2026-07-06", energy: 6, fatigue: 4, pain: 1, stress: 4, sleep: 7.1, walking: 25 },
  { date: "2026-07-07", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.6, walking: 35 },
  { date: "2026-07-08", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.5, walking: 30 },
  { date: "2026-07-09", energy: 6, fatigue: 4, pain: 1, stress: 8, sleep: 6.0, walking: 15 },
  { date: "2026-07-10", energy: 4, fatigue: 6, pain: 2, stress: 7, sleep: 5.8, walking: 10 },
  { date: "2026-07-11", energy: 5, fatigue: 5, pain: 2, stress: 5, sleep: 6.5, walking: 20 },
  { date: "2026-07-12", energy: 6, fatigue: 4, pain: 2, stress: 4, sleep: 7.0, walking: 25 },
  // Week 7
  { date: "2026-07-13", energy: 6, fatigue: 4, pain: 2, stress: 4, sleep: 6.8, walking: 20 },
  { date: "2026-07-14", energy: 5, fatigue: 5, pain: 2, stress: 4, sleep: 6.5, walking: 20 },
  { date: "2026-07-15", energy: 4, fatigue: 6, pain: 3, stress: 4, sleep: 5.8, walking: 10 },
  { date: "2026-07-16", energy: 4, fatigue: 7, pain: 3, stress: 5, sleep: 5.7, walking: 10 },
  { date: "2026-07-17", energy: 5, fatigue: 6, pain: 3, stress: 4, sleep: 6.4, walking: 15 },
  { date: "2026-07-18", energy: 6, fatigue: 5, pain: 2, stress: 3, sleep: 6.8, walking: 20 },
  { date: "2026-07-19", energy: 6, fatigue: 4, pain: 2, stress: 3, sleep: 7.2, walking: 25 },
  // Week 8
  { date: "2026-07-20", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.4, walking: 30 },
  { date: "2026-07-21", energy: 7, fatigue: 3, pain: 1, stress: 2, sleep: 7.5, walking: 35 },
  { date: "2026-07-22", energy: 8, fatigue: 2, pain: 1, stress: 2, sleep: 7.6, walking: 40 },
  { date: "2026-07-23", energy: 8, fatigue: 2, pain: 1, stress: 2, sleep: 7.7, walking: 35 },
  { date: "2026-07-24", energy: 8, fatigue: 2, pain: 1, stress: 2, sleep: 7.8, walking: 40 },
  { date: "2026-07-25", energy: 7, fatigue: 3, pain: 1, stress: 3, sleep: 7.4, walking: 30 },
  { date: "2026-07-26", energy: 8, fatigue: 2, pain: 1, stress: 2, sleep: 7.7, walking: 40 },
];

export const logEntries: LogEntry[] = [
  {
    id: "l1",
    date: "2026-07-26",
    folder: "oncology",
    type: "voice",
    title: "Walked 40 minutes, slept well",
    notes: "Energy felt steady. A little stiffness in the morning.",
    metrics: { energy: 8, stress: 2, sleep: 7.7, walking: 40 },
  },
  {
    id: "l2",
    date: "2026-07-25",
    folder: "gp",
    type: "voice",
    title: "Quiet day, lower energy",
    notes: "Didn't walk. Felt more tired by afternoon.",
    metrics: { energy: 7, stress: 3, sleep: 7.4, walking: 30 },
  },
  {
    id: "l3",
    date: "2026-07-23",
    folder: "oncology",
    type: "quick",
    title: "Quick log",
    metrics: { energy: 8, stress: 2, pain: 1, sleep: 7.7, walking: 35 },
  },
  {
    id: "l4",
    date: "2026-07-20",
    folder: "gp",
    type: "voice",
    title: "Caseworker call",
    notes: "Phone call about forms. Stressful but short.",
    metrics: { energy: 7, stress: 3, sleep: 7.4, walking: 30 },
  },
];

export const timelineEvents: TimelineEvent[] = [
  { id: "e1", date: "2026-06-01", folder: "oncology", icon: "stethoscope", title: "Chemotherapy #1", subtitle: "First cycle started" },
  { id: "e2", date: "2026-06-12", folder: "oncology", icon: "footprints", title: "Walking became a habit", subtitle: "30 minutes most days" },
  { id: "e3", date: "2026-06-22", folder: "oncology", icon: "stethoscope", title: "Chemotherapy #2", subtitle: "Fatigue discussed" },
  { id: "e4", date: "2026-06-27", folder: "gp", icon: "building", title: "Caseworker meeting", subtitle: "Stress 9/10" },
  { id: "e5", date: "2026-07-01", folder: "oncology", icon: "pill", title: "Magnesium started", subtitle: "New supplement" },
  { id: "e6", date: "2026-07-09", folder: "gp", icon: "building", title: "Caseworker meeting", subtitle: "Stress 8/10" },
  { id: "e7", date: "2026-07-13", folder: "oncology", icon: "stethoscope", title: "Chemotherapy #3", subtitle: "Energy variation discussed" },
  { id: "e8", date: "2026-07-18", folder: "oncology", icon: "scan", title: "CT scan", subtitle: "Completed" },
  { id: "e9", date: "2026-07-23", folder: "oncology", icon: "message", title: "Follow-up consultation", subtitle: "Buddyguard summary" },
];

export const consultations: Consultation[] = [
  {
    id: "c1",
    date: "2026-07-23",
    folder: "oncology",
    title: "Oncology follow-up",
    summary: "Anna's energy has been better over the past two weeks. She is walking most days. Fatigue still varies. The CT scan from 18-07-2026 looks stable.",
    whatItMeans: "No urgent changes. The plan is to continue the current treatment and keep tracking energy, fatigue and any new symptoms.",
    nextSteps: ["Continue current medication", "Next bloods on 30-07-2026", "Next consultation 06-08-2026"],
    watchItems: ["Fatigue", "New medication", "Follow-up date"],
    transcript: [
      {
        speaker: "Dr. Chen",
        text: "How have you been since the last cycle?",
        time: "14:02",
      },
      {
        speaker: "Anna",
        text: "Better, actually. I've been going for walks, and my energy feels higher in the afternoons.",
        time: "14:03",
      },
      {
        speaker: "Dr. Chen",
        text: "That's good to hear. The fatigue is still there, but if it's not stopping you from daily activities, that's a positive sign.",
        time: "14:04",
        terms: [
          {
            word: "fatigue",
            explanation: "A persistent feeling of tiredness that rest doesn't fully fix. Very common during treatment.",
          },
        ],
      },
      {
        speaker: "Anna",
        text: "Yes, I rest when I need to. The new magnesium seems to help with the muscle cramps.",
        time: "14:05",
      },
      {
        speaker: "Dr. Chen",
        text: "Keep taking it. We'll review the CT scan together next time and decide if anything needs to change.",
        time: "14:07",
      },
    ],
  },
];

export const suggestedQuestions = [
  "When did my energy start to rise?",
  "Does walking link to my energy?",
  "How did my chemo affect my energy?",
  "What happens on my stressed days?",
  "Did the caseworker meetings affect my stress?",
  "What do my best days have in common?",
  "What changed since my last visit?",
];

export function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return `${d}-${m}-${y}`;
}

export function formatShortDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function getWalkDaysEnergy() {
  const walkDays = dailyEntries.filter((d) => d.walking >= 20);
  const nonWalkDays = dailyEntries.filter((d) => d.walking < 20);
  const avgWalk = walkDays.reduce((s, d) => s + d.energy, 0) / walkDays.length;
  const avgNonWalk = nonWalkDays.reduce((s, d) => s + d.energy, 0) / nonWalkDays.length;
  return { walk: avgWalk, nonWalk: avgNonWalk };
}

export function getBestDays() {
  const sorted = [...dailyEntries].sort((a, b) => b.energy - a.energy).slice(0, 6);
  const withAllThree = sorted.filter((d) => d.sleep > 7 && d.walking >= 30 && d.stress <= 3);
  return { sorted, withAllThree };
}

export function getChemoEnergy() {
  const chemoDates = ["2026-06-01", "2026-06-22", "2026-06-22", "2026-07-13"];
  return [
    { label: "Chemo #1", before: 5, lowest: 2 },
    { label: "Chemo #2", before: 5, lowest: 3 },
    { label: "Chemo #3", before: 6, lowest: 4 },
  ];
}
