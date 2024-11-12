// src/lib/commands.ts

interface AppInfo {
  name: string;
  bundleId: string;
  timestamp: number;
}

// Tauri v2 command wrappers
export async function getActiveApp(): Promise<AppInfo> {
  return await invoke("get_active_app");
}

export async function saveAppData(
  name: string,
  duration: number
): Promise<void> {
  return await invoke("save_app_data", { name, duration });
}

// React component example
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export function AppMonitor() {
  const [activeApp, setActiveApp] = useState<AppInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const app = await getActiveApp();
        setActiveApp(app);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Active Application</h2>
      {activeApp && (
        <div className="bg-gray-100 p-4 rounded">
          <p>Name: {activeApp.name}</p>
          <p>Bundle ID: {activeApp.bundleId}</p>
          <p>
            Last Updated:{" "}
            {new Date(activeApp.timestamp * 1000).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
