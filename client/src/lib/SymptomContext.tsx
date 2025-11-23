import React, { createContext, useContext, useState, ReactNode } from "react";
import { SymptomLog, INITIAL_LOGS } from "./mockData";

interface SymptomContextType {
  logs: SymptomLog[];
  addLog: (log: Omit<SymptomLog, "id" | "date">) => void;
}

const SymptomContext = createContext<SymptomContextType | undefined>(undefined);

export function SymptomProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<SymptomLog[]>(INITIAL_LOGS);

  const addLog = (newLog: Omit<SymptomLog, "id" | "date">) => {
    const log: SymptomLog = {
      ...newLog,
      id: Math.random().toString(36).substring(7),
      date: new Date(),
    };
    setLogs((prev) => [log, ...prev]);
  };

  return (
    <SymptomContext.Provider value={{ logs, addLog }}>
      {children}
    </SymptomContext.Provider>
  );
}

export function useSymptoms() {
  const context = useContext(SymptomContext);
  if (context === undefined) {
    throw new Error("useSymptoms must be used within a SymptomProvider");
  }
  return context;
}
