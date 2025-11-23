import { useSymptoms } from "@/lib/SymptomContext";
import { Navbar } from "@/components/navbar";
import { SymptomLogger } from "@/components/symptom-logger";
import { SymptomChart } from "@/components/symptom-chart";
import { RecentLogs } from "@/components/recent-logs";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/abstract_soothing_medical_background_with_soft_blue_and_teal_gradients.png";

export default function Home() {
  const { logs, addLog } = useSymptoms();

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <main className="pb-20">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] md:h-[350px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <img 
            src={heroImage} 
            alt="Soothing abstract medical background" 
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          
          <div className="container relative z-20 mx-auto h-full flex flex-col justify-center px-4">
            <div className="max-w-2xl space-y-4 animate-in slide-in-from-left-10 duration-700 fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                Track your health,<br />
                <span className="text-foreground">Empower your doctor.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                A simple, dignified way to log chronic pain and symptoms. 
                Create clear reports for your next appointment.
              </p>
              <div className="pt-2">
                <Link href="/reports">
                  <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all">
                    <FileText className="h-5 w-5" />
                    Generate Report
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 -mt-10 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Logger & Chart */}
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <SymptomLogger onLogSubmit={addLog} />
              </section>

              <section>
                <SymptomChart data={logs} />
              </section>
            </div>

            {/* Right Column: Recent Activity */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RecentLogs logs={logs} />
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
