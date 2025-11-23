import { subDays, format } from "date-fns";

export type SymptomLog = {
  id: string;
  date: Date; // Log creation date
  painStartTime?: string; // User specified start time
  symptom: string;
  severity: number; // 1-10
  notes: string;
  duration: string; // e.g., "2 hours", "All day"
  activity?: string; // "What were you doing?"
  changes?: string; // "What changed?"
};

export const INITIAL_LOGS: SymptomLog[] = [
  {
    id: "1",
    date: subDays(new Date(), 0),
    painStartTime: subDays(new Date(), 0).toISOString(),
    symptom: "Migraine",
    severity: 7,
    notes: "Sensitive to light.",
    duration: "4 hours",
    activity: "Working on computer",
    changes: "Took painkillers, rested in dark room"
  },
  {
    id: "2",
    date: subDays(new Date(), 1),
    symptom: "Lower Back Pain",
    severity: 4,
    notes: "Dull ache.",
    duration: "All day",
    activity: "Sitting at desk",
    changes: "Stretched, used standing desk"
  },
  {
    id: "3",
    date: subDays(new Date(), 2),
    symptom: "Migraine",
    severity: 5,
    notes: "Mild.",
    duration: "2 hours",
    activity: "Reading",
    changes: "Drank water"
  },
  {
    id: "4",
    date: subDays(new Date(), 3),
    symptom: "Fatigue",
    severity: 6,
    notes: "Woke up feeling unrefreshed.",
    duration: "Morning",
    activity: "Sleeping",
    changes: "Coffee"
  },
  {
    id: "5",
    date: subDays(new Date(), 4),
    symptom: "Joint Pain (Knees)",
    severity: 3,
    notes: "Rainy weather.",
    duration: "Intermittent",
    activity: "Walking",
    changes: "Rest"
  },
  {
    id: "6",
    date: subDays(new Date(), 5),
    symptom: "Migraine",
    severity: 8,
    notes: "Severe.",
    duration: "6 hours",
    activity: "Stressful meeting",
    changes: "Medication"
  },
  {
    id: "7",
    date: subDays(new Date(), 6),
    symptom: "Fatigue",
    severity: 4,
    notes: "Better than yesterday.",
    duration: "All day",
    activity: "Normal routine",
    changes: "Went to bed early"
  }
];
