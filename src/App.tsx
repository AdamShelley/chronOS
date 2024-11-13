import { useEffect, useState } from "react";
import "./App.css";
import ProcessCard from "./ProcessCard";
import { invoke } from "@tauri-apps/api/core";
import { ThemeProvider } from "./providers/theme-provider";

interface ProcessInfo {
  id: string;
  name: string;
  running_time_formatted: string;
  memory_in_bytes: number;
}

function App() {
  const [processes, setProcesses] = useState<ProcessInfo[]>([]);
  const [maxMemory, setMaxMemory] = useState<ProcessInfo | null>(null);
  const [maxRunning, setMaxRunning] = useState<ProcessInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      const processList = await invoke<ProcessInfo[]>("list_process");
      const maxMemory = await invoke<ProcessInfo>("max_memory");
      const maxRunningTime = await invoke<ProcessInfo>("max_running_time");

      console.log(maxMemory);

      setProcesses(processList);
      setMaxMemory(maxMemory);
      setMaxRunning(maxRunningTime);
    }

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="container p-5">
        <h1 className="">Process List</h1>
        <div className="flex">
          {maxMemory && <ProcessCard title="Max Memory" process={maxMemory} />}

          {maxRunning && (
            <ProcessCard title="Max Running Time" process={maxRunning} />
          )}
        </div>

        <div className="flex flex-wrap gap-5">
          {processes.map((process) => (
            <ProcessCard
              key={process.id}
              title={process.name}
              process={process}
            />
          ))}
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
