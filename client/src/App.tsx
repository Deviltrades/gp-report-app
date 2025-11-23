import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SymptomProvider } from "@/lib/SymptomContext";
import Home from "@/pages/home";
import Reports from "@/pages/reports";
import NotFound from "@/pages/not-found";

// App Router Configuration
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/reports" component={Reports} />
      {/* Redirect /logs to home for now, or duplicate home view */}
      <Route path="/logs" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SymptomProvider>
          <Toaster />
          <Router />
        </SymptomProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
