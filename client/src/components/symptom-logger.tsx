import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Save, CalendarClock, AlertTriangle } from "lucide-react";
import { SymptomLog } from "@/lib/mockData";
import { format } from "date-fns";

const formSchema = z.object({
  symptom: z.string().min(2, { message: "Symptom required" }),
  location: z.string().min(2, { message: "Location required" }),
  painStartTime: z.string().min(1, { message: "Start time required" }),
  onsetSpeed: z.enum(["Sudden", "Gradual", "Unknown"]),
  frequency: z.enum(["Once per day", "Random", "Continuous", "After activities", "Other"]),
  duration: z.string().min(1, { message: "Duration required" }),
  severity: z.number().min(1).max(10),
  triggers: z.string().optional(),
  relievers: z.string().optional(),
  associatedSymptoms: z.string().optional(),
  impact: z.enum(["None", "Mild", "Moderate", "Severe"]),
  medication: z.string().optional(),
  hasRedFlags: z.boolean().default(false),
  redFlags: z.string().optional(),
  notes: z.string().optional(),
});

interface SymptomLoggerProps {
  onLogSubmit: (log: Omit<SymptomLog, "id" | "date">) => void;
}

export function SymptomLogger({ onLogSubmit }: SymptomLoggerProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptom: "",
      location: "",
      painStartTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      onsetSpeed: "Unknown",
      frequency: "Random",
      duration: "",
      severity: 5,
      triggers: "",
      relievers: "",
      associatedSymptoms: "",
      impact: "Mild",
      medication: "",
      hasRedFlags: false,
      redFlags: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onLogSubmit({
      ...values,
      triggers: values.triggers || "None",
      relievers: values.relievers || "None",
      associatedSymptoms: values.associatedSymptoms || "None",
      medication: values.medication || "None",
      redFlags: values.hasRedFlags ? (values.redFlags || "Flagged") : "",
      notes: values.notes || "",
    });
    
    toast({
      title: "Symptom Logged",
      description: "Detailed entry saved for your GP report.",
    });
    
    form.reset({
      symptom: "",
      location: "",
      painStartTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      onsetSpeed: "Unknown",
      frequency: "Random",
      duration: "",
      severity: 5,
      triggers: "",
      relievers: "",
      associatedSymptoms: "",
      impact: "Mild",
      medication: "",
      hasRedFlags: false,
      redFlags: "",
      notes: "",
    });
    setIsExpanded(false);
  }

  if (!isExpanded) {
    return (
      <Card className="bg-primary/5 border-primary/10 cursor-pointer hover:bg-primary/10 transition-all" onClick={() => setIsExpanded(true)}>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex flex-col items-center gap-3 text-primary">
            <PlusCircle className="h-10 w-10" />
            <span className="font-semibold text-lg">Log New Symptom</span>
            <span className="text-sm text-muted-foreground">Detailed Entry for GP</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg max-w-3xl mx-auto">
      <CardHeader className="bg-primary/5 pb-4 border-b border-primary/10">
        <CardTitle className="text-primary flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Log Symptom Entry
        </CardTitle>
        <CardDescription>
          Complete this form to give your GP a clear picture of your condition.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* Section 1: The Basics */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b pb-1">1. The Symptom</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="symptom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Symptom</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Migraine, Back Pain" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exact Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Left temple, Lower back" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 2: Onset & Timing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b pb-1">2. Onset & Timing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="painStartTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When did it start?</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="datetime-local" {...field} />
                          <CalendarClock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="onsetSpeed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Was it sudden or gradual?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select onset speed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sudden">Sudden</SelectItem>
                          <SelectItem value="Gradual">Gradual</SelectItem>
                          <SelectItem value="Unknown">I'm not sure</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How long does it last?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Minutes">Minutes</SelectItem>
                          <SelectItem value="1-4 hours">1-4 hours</SelectItem>
                          <SelectItem value="4-8 hours">4-8 hours</SelectItem>
                          <SelectItem value="All day">All day</SelectItem>
                          <SelectItem value="Ongoing">Ongoing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frequency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="How often?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Once per day">Once per day</SelectItem>
                          <SelectItem value="Random">Random</SelectItem>
                          <SelectItem value="Continuous">Continuous</SelectItem>
                          <SelectItem value="After activities">After activities</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 3: Severity & Impact */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b pb-1">3. Severity & Impact</h3>
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="severity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Severity (1-10)</FormLabel>
                      <div className="flex items-center gap-4">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          value={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                          className="flex-1"
                        />
                        <span className={`w-12 text-center font-bold text-lg border rounded-md py-1 ${
                          field.value >= 8 ? "bg-red-100 text-red-700 border-red-200" :
                          field.value >= 5 ? "bg-orange-100 text-orange-700 border-orange-200" :
                          "bg-secondary text-secondary-foreground"
                        }`}>
                          {field.value}
                        </span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="impact"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Impact on Daily Life</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-wrap gap-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="None" />
                            </FormControl>
                            <FormLabel className="font-normal">None</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Mild" />
                            </FormControl>
                            <FormLabel className="font-normal">Mild (Annoying)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Moderate" />
                            </FormControl>
                            <FormLabel className="font-normal">Moderate (Can't work)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Severe" />
                            </FormControl>
                            <FormLabel className="font-normal">Severe (Bedridden)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 4: Details & Context */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider border-b pb-1">4. Context & Triggers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="triggers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Triggers</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Stress, Food, Exercise" {...field} />
                      </FormControl>
                      <FormDescription>What makes it start?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relievers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relievers</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Rest, Water, Heat" {...field} />
                      </FormControl>
                      <FormDescription>What makes it better?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="associatedSymptoms"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Associated Symptoms</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Nausea, Dizziness" {...field} />
                      </FormControl>
                      <FormDescription>What else happens?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication Taken</FormLabel>
                      <FormControl>
                        <Input placeholder="Name & Dosage" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Section 5: Red Flags */}
            <div className="bg-destructive/5 p-4 rounded-lg border border-destructive/20">
               <FormField
                  control={form.control}
                  name="hasRedFlags"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-destructive font-semibold flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Any Red Flag Symptoms?
                        </FormLabel>
                        <FormDescription className="text-destructive/80 text-xs">
                          Fever, sudden severe pain, blood, fainting, weight loss?
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                {form.watch("hasRedFlags") && (
                  <FormField
                    control={form.control}
                    name="redFlags"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormControl>
                          <Input placeholder="Describe the alert symptom..." className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any other details relevant to this episode?"
                      className="resize-none min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="outline" onClick={() => setIsExpanded(false)}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2 min-w-[120px]">
                <Save className="h-4 w-4" />
                Save Log
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
