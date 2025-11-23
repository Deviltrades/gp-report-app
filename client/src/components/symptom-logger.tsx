import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { useToast } from "@/hooks/use-toast";
import { PlusCircle, Save, CalendarClock } from "lucide-react";
import { SymptomLog } from "@/lib/mockData";
import { format } from "date-fns";

const formSchema = z.object({
  symptom: z.string().min(2, {
    message: "Symptom must be at least 2 characters.",
  }),
  painStartTime: z.string().optional(),
  severity: z.number().min(1).max(10),
  duration: z.string().min(1, {
    message: "Please specify duration.",
  }),
  activity: z.string().optional(),
  changes: z.string().optional(),
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
      painStartTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      severity: 5,
      duration: "",
      activity: "",
      changes: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onLogSubmit({
      ...values,
      painStartTime: values.painStartTime || new Date().toISOString(),
      activity: values.activity || "",
      changes: values.changes || "",
      notes: values.notes || "",
    });
    
    toast({
      title: "Symptom Logged",
      description: "Your entry has been saved to your daily record.",
    });
    
    form.reset({
      symptom: "",
      painStartTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      severity: 5,
      duration: "",
      activity: "",
      changes: "",
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
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-primary/5 pb-4">
        <CardTitle className="text-primary">Log Symptom</CardTitle>
        <CardDescription>Record details about your pain or symptom.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="symptom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptom Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Migraine, Back Pain" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="painStartTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>When did the pain start?</FormLabel>
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
            </div>

            <FormField
              control={form.control}
              name="severity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How strong was it? (1-10)</FormLabel>
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
                  <FormDescription>
                    1 is mild discomfort, 10 is unbearable pain.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How long did it last?</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="< 1 hour">Less than 1 hour</SelectItem>
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
              name="activity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What were you doing?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Working at computer, Sleeping, Exercising" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="changes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What changed?</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Took medication, Lay down, Ate food" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any other details?"
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
              <Button type="submit" className="gap-2">
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
