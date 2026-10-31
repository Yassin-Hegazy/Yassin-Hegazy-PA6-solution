"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function remove() {
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      const body: { message?: string } = await response.json();
      if (!response.ok) throw new Error(body.message ?? "Could not delete todo");
      router.push("/todos");
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not delete todo");
      setPending(false);
    }
  }

  return <div>
    <button type="button" className="btn btn-danger" disabled={pending} onClick={remove}>
      {pending ? "Deleting..." : "Delete todo"}
    </button>
    {error && <p role="alert" className="error">{error}</p>}
  </div>;
}
