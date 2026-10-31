import { getTodo } from "@/lib/todos";
import TodoModal from "../../../../_components/TodoModal";
import TodoDetails from "../../../../_components/TodoDetails";

export default async function InterceptedTodo({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const todo = await getTodo(id);
  return <TodoModal>
    {todo ? <TodoDetails todo={todo} /> : <p>Todo not found.</p>}
    <p className="muted">Refresh this URL to see the full details page.</p>
  </TodoModal>;
}
