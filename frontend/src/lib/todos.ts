/** Backend access stays on the Next server; browser mutations use local route handlers. */
export type Todo = { id: number; title: string; done: boolean };

const apiUrl = () => process.env.API_URL ?? "http://localhost:3000";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${apiUrl()}/todos`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load todos (${response.status})`);
  return (await response.json()) as Todo[];
}

export async function getTodo(id: string): Promise<Todo | null> {
  const response = await fetch(`${apiUrl()}/todos/${encodeURIComponent(id)}`, {
    cache: "no-store",
  });
  if (response.status === 404 || response.status === 400) return null;
  if (!response.ok) throw new Error(`Could not load todo (${response.status})`);
  return (await response.json()) as Todo;
}

export function backendTodosUrl(id?: string): string {
  return `${apiUrl()}/todos${id ? `/${encodeURIComponent(id)}` : ""}`;
}
