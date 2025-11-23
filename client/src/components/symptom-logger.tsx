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
import { PlusCircle, Save } from "lucide-react";
import { SymptomLog } from "@/lib/mockData";

const formSchema = z.object({
  symptom: z.string().min(2, {
    message: "Symptom must be at least 2 characters.",
  }),
  severity: z.number().min(1).max(10),
  duration: z.string().min(1, {
    message: "Please specify duration.",
  }),
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
      severity: 5,
      duration: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onLogSubmit({
      ...values,
      notes: values.notes || "",
    });
    
    toast({
      title: "Symptom Logged",
      description: "Your entry has been saved to your daily record.",
    });
    
    form.reset({
      symptom: "",
      severity: 5,
      duration: "",
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
        <CardDescription>Record how you're feeling right now.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="symptom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Symptom Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Migraine, Back Pain, Nausea" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <span className="w-12 text-center font-bold text-lg border rounded-md py-1 bg-secondary text-secondary-foreground">
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
                  <FormLabel>Duration</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How long did it last?" />
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any triggers, medications taken, or specific details?"
                      className="resize-none"
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
