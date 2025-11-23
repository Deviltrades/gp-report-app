import { useSymptoms } from "@/lib/SymptomContext";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Printer, Download, ChevronLeft } from "lucide-react";
import { Link } from "wouter";

export default function Reports() {
  const { logs } = useSymptoms();
  
  // Calculate some basic stats
  const totalLogs = logs.length;
  const avgSeverity = totalLogs > 0 
    ? (logs.reduce((acc, log) => acc + log.severity, 0) / totalLogs).toFixed(1)
    : "0";
  
  // Get unique symptoms
  const uniqueSymptoms = Array.from(new Set(logs.map(l => l.symptom)));
  
  const sortedLogs = [...logs].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
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

        <Card className="shadow-lg border-t-4 border-t-primary print:shadow-none print:border-0">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-heading text-primary">GP Health Report</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated on {format(new Date(), "MMMM d, yyyy")}
                </p>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">Patient Name</div>
                <div className="text-sm text-muted-foreground">Jane Doe</div>
              </div>
            </div>
          </CardHeader>
          
          <Separator />
          
          <CardContent className="pt-6 space-y-8">
            {/* Summary Section */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-4 w-1 bg-primary rounded-full"></div>
                Summary Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-secondary/50 p-4 rounded-lg border border-secondary">
                  <div className="text-sm text-muted-foreground">Total Entries</div>
                  <div className="text-2xl font-bold text-primary">{totalLogs}</div>
                  <div className="text-xs text-muted-foreground">Last 30 days</div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg border border-secondary">
                  <div className="text-sm text-muted-foreground">Average Severity</div>
                  <div className="text-2xl font-bold text-primary">{avgSeverity}<span className="text-sm font-normal text-muted-foreground">/10</span></div>
                  <div className="text-xs text-muted-foreground">Pain Intensity</div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-lg border border-secondary">
                  <div className="text-sm text-muted-foreground">Active Symptoms</div>
                  <div className="text-xl font-bold text-primary truncate">
                    {uniqueSymptoms.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Recorded types</div>
                </div>
              </div>
            </section>

            {/* Detailed Logs Table */}
            <section>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <div className="h-4 w-1 bg-primary rounded-full"></div>
                Detailed Log History
              </h3>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted/50 text-muted-foreground font-medium">
                    <tr>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Symptom</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Duration</th>
                      <th className="p-3">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sortedLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-medium">{format(log.date, "MMM d, h:mm a")}</td>
                        <td className="p-3">{log.symptom}</td>
                        <td className="p-3">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                            log.severity >= 8 ? "bg-red-100 text-red-700" :
                            log.severity >= 5 ? "bg-orange-100 text-orange-700" :
                            "bg-green-100 text-green-700"
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="p-3">{log.duration}</td>
                        <td className="p-3 text-muted-foreground max-w-xs">{log.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
