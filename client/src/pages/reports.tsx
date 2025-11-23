import { useSymptoms } from "@/lib/SymptomContext";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Printer, Download, ChevronLeft, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function Reports() {
  const { logs } = useSymptoms();
  
  const totalLogs = logs.length;
  const avgSeverity = totalLogs > 0 
    ? (logs.reduce((acc, log) => acc + log.severity, 0) / totalLogs).toFixed(1)
    : "0";
  
  const uniqueSymptoms = Array.from(new Set(logs.map(l => l.symptom)));
  const sortedLogs = [...logs].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      <div className="print:hidden">
        <Navbar />
      </div>
      
      <main className="container mx-auto px-4 py-8 max-w-5xl print:max-w-full print:p-0">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <Link href="/">
            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Print Report
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        <Card className="shadow-lg border-t-4 border-t-primary print:shadow-none print:border-0 print:rounded-none">
          <CardHeader className="pb-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-3xl font-heading text-primary">GP Health Report</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated on {format(new Date(), "MMMM d, yyyy")}
                </p>
              </div>
              <div className="text-right p-4 bg-secondary/20 rounded-lg border print:border-gray-200">
                <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">Patient Details</div>
                <div className="text-lg font-semibold">Jane Doe</div>
                <div className="text-sm text-muted-foreground">DOB: 01/01/1980</div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6 space-y-8">
            {/* Summary Section */}
            <section className="print:break-inside-avoid">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                <div className="h-5 w-1.5 bg-primary rounded-full"></div>
                Clinical Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-secondary/30 p-4 rounded-lg border border-secondary print:border-gray-200">
                  <div className="text-sm text-muted-foreground">Total Entries</div>
                  <div className="text-3xl font-bold text-primary">{totalLogs}</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border border-secondary print:border-gray-200">
                  <div className="text-sm text-muted-foreground">Avg. Severity</div>
                  <div className="text-3xl font-bold text-primary">{avgSeverity}<span className="text-lg font-normal text-muted-foreground">/10</span></div>
                  <div className="text-xs text-muted-foreground">Pain Intensity</div>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border border-secondary print:border-gray-200">
                  <div className="text-sm text-muted-foreground">Primary Symptoms</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {uniqueSymptoms.slice(0, 3).map(s => (
                      <span key={s} className="text-xs font-medium bg-white px-2 py-1 rounded-md border shadow-sm">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary/30 p-4 rounded-lg border border-secondary print:border-gray-200">
                  <div className="text-sm text-muted-foreground">Impact</div>
                  <div className="text-lg font-bold text-primary">
                    {logs.some(l => l.impact === "Severe") ? "Severe Episodes" : "Moderate"}
                  </div>
                  <div className="text-xs text-muted-foreground">Highest recorded</div>
                </div>
              </div>
            </section>

            {/* Detailed Logs List */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
                <div className="h-5 w-1.5 bg-primary rounded-full"></div>
                Detailed Symptom Log
              </h3>
              <div className="space-y-4">
                {sortedLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg overflow-hidden print:break-inside-avoid">
                    {/* Header Row */}
                    <div className="bg-muted/30 p-3 border-b flex flex-wrap gap-4 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-lg">{format(new Date(log.painStartTime), "MMM d, yyyy")}</span>
                        <span className="text-muted-foreground text-sm font-medium">
                          {format(new Date(log.painStartTime), "h:mm a")}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                          {log.symptom}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Severity</span>
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${
                          log.severity >= 8 ? "bg-red-100 text-red-700 border-red-200" :
                          log.severity >= 5 ? "bg-orange-100 text-orange-700 border-orange-200" :
                          "bg-green-100 text-green-700 border-green-200"
                        }`}>
                          {log.severity}
                        </span>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 text-sm">
                      <div>
                        <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Details</span>
                        <div className="space-y-1">
                          <div className="flex justify-between"><span className="text-muted-foreground">Location:</span> <span className="font-medium">{log.location}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Onset:</span> <span className="font-medium">{log.onsetSpeed}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Duration:</span> <span className="font-medium">{log.duration}</span></div>
                          <div className="flex justify-between"><span className="text-muted-foreground">Frequency:</span> <span className="font-medium">{log.frequency}</span></div>
                        </div>
                      </div>

                      <div>
                        <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Context</span>
                        <div className="space-y-1">
                          <div className="grid grid-cols-[80px_1fr] gap-1"><span className="text-muted-foreground">Triggers:</span> <span className="font-medium">{log.triggers}</span></div>
                          <div className="grid grid-cols-[80px_1fr] gap-1"><span className="text-muted-foreground">Relievers:</span> <span className="font-medium">{log.relievers}</span></div>
                          <div className="grid grid-cols-[80px_1fr] gap-1"><span className="text-muted-foreground">Assoc.:</span> <span className="font-medium">{log.associatedSymptoms}</span></div>
                        </div>
                      </div>

                      <div>
                        <span className="block text-muted-foreground text-xs uppercase tracking-wider mb-1">Action & Impact</span>
                        <div className="space-y-1">
                          <div className="grid grid-cols-[80px_1fr] gap-1"><span className="text-muted-foreground">Impact:</span> <span className="font-medium">{log.impact}</span></div>
                          <div className="grid grid-cols-[80px_1fr] gap-1"><span className="text-muted-foreground">Meds:</span> <span className="font-medium">{log.medication}</span></div>
                          {log.redFlags && (
                            <div className="mt-2 flex items-start gap-1 text-destructive font-bold">
                              <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                              <span>{log.redFlags}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes Footer */}
                    {log.notes && (
                      <div className="bg-muted/10 p-3 border-t text-sm">
                        <span className="font-semibold mr-2">Notes:</span>
                        <span className="text-muted-foreground">{log.notes}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
