"use client";

export default function TodosError({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <section className="card">
    <h1>Could not load todos</h1>
    <p role="alert" className="error">{error.message}</p>
    <p className="muted">Check the NestJS backend on port 3000, then retry.</p>
    <button className="btn" onClick={reset}>Try again</button>
  </section>;
}
