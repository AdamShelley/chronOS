import { useEffect, useState } from "react";
import "./App.css";
import ProcessCard from "./ProcessCard";
import { invoke } from "@tauri-apps/api/core";

interface ProcessInfo {
  id: string;
  name: string;
  running_time: string;
  memory: number;
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

      setProcesses(processList);
      setMaxMemory(maxMemory);
      setMaxRunning(maxRunningTime);
    }

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="container">
      <h1>Process List</h1>
      <div className="process-list">
        {processes.map((process) => (
          <ProcessCard
            key={process.id}
            title={process.name}
            process={process}
          />
        ))}
      </div>
      <h1>Max Memory</h1>
      {maxMemory && <ProcessCard title="Max Memory" process={maxMemory} />}
      <h1>Max Running Time</h1>
      {maxRunning && (
        <ProcessCard title="Max Running Time" process={maxRunning} />
      )}
    </main>
  );
}

export default App;
