"use client";

import { useEffect, useState } from "react";

type Counts = { total: number; done: number; open: number };

export default function Stats() {
  const [stats, setStats] = useState<Counts | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/stats", { signal: controller.signal, cache: "no-store" })
      .then((res) => { if (!res.ok) throw new Error("Stats unavailable"); return res.json() as Promise<Counts>; })
      .then(setStats)
      .catch((reason: unknown) => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "Stats unavailable"); });
    return () => controller.abort();
  }, []);

  if (error) return <p role="alert" className="error">{error} — start the backend on port 3000.</p>;
  if (!stats) return <p>Loading statistics...</p>;
  return <div className="grid">
    <div className="card"><h2>{stats.total}</h2><p>Total todos</p></div>
    <div className="card"><h2>{stats.done}</h2><p>Done</p></div>
    <div className="card"><h2>{stats.open}</h2><p>Open</p></div>
  </div>;
}
