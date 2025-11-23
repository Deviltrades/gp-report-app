import { format } from "date-fns";
import { SymptomLog } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, MapPin, AlertTriangle } from "lucide-react";

interface RecentLogsProps {
  logs: SymptomLog[];
}

export function RecentLogs({ logs }: RecentLogsProps) {
  // Sort by date descending
  const sortedLogs = [...logs].sort((a, b) => b.date.getTime() - a.date.getTime());

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return "bg-red-100 text-red-700 border-red-200";
    if (severity >= 5) return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-muted-foreground">Recent Activity</h3>
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {sortedLogs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-3 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{log.symptom}</span>
                  <Badge variant="outline" className={getSeverityColor(log.severity)}>
                    {log.severity}/10
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">
                  {format(log.date, "MMM d")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                   <MapPin className="h-3 w-3" />
                   <span className="truncate">{log.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <Clock className="h-3 w-3" />
                   <span className="truncate">{log.duration}</span>
                </div>
              </div>
              
              {log.redFlags && (
                <div className="flex items-center gap-2 text-xs font-medium text-destructive bg-destructive/5 p-1.5 rounded border border-destructive/10">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Alert: {log.redFlags}</span>
                </div>
              )}

              {log.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2 bg-muted/20 p-2 rounded-md">
                  "{log.notes}"
                </p>
              )}
            </div>
          ))}
          {sortedLogs.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              No logs yet. Start tracking your health today.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
