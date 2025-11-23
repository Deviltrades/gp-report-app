import { subDays, format } from "date-fns";

export type SymptomLog = {
  id: string;
  date: Date;
  symptom: string;
  severity: number; // 1-10
  notes: string;
  duration: string; // e.g., "2 hours", "All day"
};

export const INITIAL_LOGS: SymptomLog[] = [
  {
    id: "1",
    date: subDays(new Date(), 0),
    symptom: "Migraine",
    severity: 7,
    notes: "Started after lunch, sensitive to light.",
    duration: "4 hours"
  },
  {
    id: "2",
    date: subDays(new Date(), 1),
    symptom: "Lower Back Pain",
    severity: 4,
    notes: "Dull ache after sitting for too long.",
    duration: "All day"
  },
  {
    id: "3",
    date: subDays(new Date(), 2),
    symptom: "Migraine",
    severity: 5,
    notes: "Mild, managed with water and rest.",
    duration: "2 hours"
  },
  {
    id: "4",
    date: subDays(new Date(), 3),
    symptom: "Fatigue",
    severity: 6,
    notes: "Woke up feeling unrefreshed.",
    duration: "Morning"
  },
  {
    id: "5",
    date: subDays(new Date(), 4),
    symptom: "Joint Pain (Knees)",
    severity: 3,
    notes: "Rainy weather seems to trigger it.",
    duration: "Intermittent"
  },
  {
    id: "6",
    date: subDays(new Date(), 5),
    symptom: "Migraine",
    severity: 8,
    notes: "Severe, had to lie down in dark room.",
    duration: "6 hours"
  },
  {
    id: "7",
    date: subDays(new Date(), 6),
    symptom: "Fatigue",
    severity: 4,
    notes: "Better than yesterday.",
    duration: "All day"
  }
];
