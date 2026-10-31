"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewTodoForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      // Send even an empty title to demonstrate the backend's own 400 message.
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const body: { message?: string | string[] } = await response.json();
      if (!response.ok) {
        const message = Array.isArray(body.message) ? body.message.join(", ") : body.message;
        throw new Error(message ?? "Could not create todo");
      }
      router.push("/todos");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not create todo");
      setPending(false);
    }
  }

  return <form onSubmit={submit} className="card">
    <label htmlFor="todo-title">Title</label>
    <input id="todo-title" className="field" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="What needs to be done?" />
    <button type="submit" disabled={pending} className="btn">{pending ? "Creating..." : "Create"}</button>
    {error && <p role="alert" className="error">{error}</p>}
  </form>;
}
