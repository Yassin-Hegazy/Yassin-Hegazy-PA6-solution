import Link from "next/link";
import DeleteButton from "./DeleteButton";
import type { Todo } from "@/lib/todos";

export default function TodoDetails({ todo }: { todo: Todo }) {
  return <>
    <h2>{todo.title}</h2>
    <p><strong>ID:</strong> {todo.id}</p>
    <p><strong>Title:</strong> {todo.title}</p>
    <p><strong>Done:</strong> <span className={`status ${todo.done ? "done" : ""}`}>{todo.done ? "Yes" : "No"}</span></p>
    <div className="row" style={{ marginTop: 20 }}>
      <Link href="/todos">Back to todos</Link>
      <DeleteButton id={todo.id} />
    </div>
  </>;
}
