import { subDays, subHours } from "date-fns";

export type OnsetSpeed = "Sudden" | "Gradual" | "Unknown";
export type Frequency = "Once per day" | "Random" | "Continuous" | "After activities" | "Other";
export type Impact = "None" | "Mild" | "Moderate" | "Severe";

export type SymptomLog = {
  id: string;
  date: Date; // Log creation date
  
  // 1. Onset
  painStartTime: string;
  onsetSpeed: OnsetSpeed;
  
  // 2. Frequency
  frequency: Frequency;
  
  // 3. Duration
  duration: string; 
  
  // 4. Severity
  severity: number; // 1-10
  
  // 5. Triggers
  triggers: string;
  
  // 6. Relievers
  relievers: string;
  
  // 7. Associated Symptoms
  associatedSymptoms: string;
  
  // 8. Impact
  impact: Impact;
  
  // 9. Medication
  medication: string;
  
  // 11. Location
  location: string;
  
  // 12. Red Flags
  redFlags: string; // Empty if none
  
  symptom: string; // Main symptom name
  notes: string;
};

export const INITIAL_LOGS: SymptomLog[] = [
  {
    id: "1",
    date: subDays(new Date(), 0),
    painStartTime: subHours(new Date(), 4).toISOString(),
    onsetSpeed: "Sudden",
    frequency: "Random",
    duration: "4 hours",
    severity: 7,
    triggers: "Bright lights, Screen time",
    relievers: "Lying down in dark room",
    associatedSymptoms: "Nausea, Sensitivity to light",
    impact: "Severe",
    medication: "Sumatriptan 50mg",
    location: "Left temple",
    redFlags: "",
    symptom: "Migraine",
    notes: "Started after lunch."
  },
  {
    id: "2",
    date: subDays(new Date(), 1),
    painStartTime: subDays(new Date(), 1).toISOString(),
    onsetSpeed: "Gradual",
    frequency: "Continuous",
    duration: "All day",
    severity: 4,
    triggers: "Sitting for long periods",
    relievers: "Stretching, Standing desk",
    associatedSymptoms: "Stiffness",
    impact: "Mild",
    medication: "Ibuprofen 400mg",
    location: "Lower lumbar region",
    redFlags: "",
    symptom: "Lower Back Pain",
    notes: "Dull ache."
  },
  {
    id: "3",
    date: subDays(new Date(), 2),
    painStartTime: subDays(new Date(), 2).toISOString(),
    onsetSpeed: "Sudden",
    frequency: "Random",
    duration: "2 hours",
    severity: 5,
    triggers: "Dehydration?",
    relievers: "Water, Rest",
    associatedSymptoms: "None",
    impact: "Moderate",
    medication: "None",
    location: "Forehead",
    redFlags: "",
    symptom: "Headache",
    notes: "Mild."
  },
  {
    id: "4",
    date: subDays(new Date(), 3),
    painStartTime: subDays(new Date(), 3).toISOString(),
    onsetSpeed: "Gradual",
    frequency: "Once per day",
    duration: "Morning",
    severity: 6,
    triggers: "Poor sleep",
    relievers: "Coffee, Shower",
    associatedSymptoms: "Brain fog",
    impact: "Moderate",
    medication: "None",
    location: "General body",
    redFlags: "",
    symptom: "Fatigue",
    notes: "Woke up feeling unrefreshed."
  },
  {
    id: "5",
    date: subDays(new Date(), 4),
    painStartTime: subDays(new Date(), 4).toISOString(),
    onsetSpeed: "Gradual",
    frequency: "After activities",
    duration: "Intermittent",
    severity: 3,
    triggers: "Walking up stairs",
    relievers: "Rest",
    associatedSymptoms: "Clicking sound",
    impact: "Mild",
    medication: "None",
    location: "Right knee",
    redFlags: "",
    symptom: "Joint Pain",
    notes: "Rainy weather."
  }
];
