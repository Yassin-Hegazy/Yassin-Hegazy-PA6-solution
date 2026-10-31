import Link from "next/link";
import NewTodoForm from "../../../_components/NewTodoForm";

export default function NewTodoPage() {
  return <><h1>New todo</h1><NewTodoForm /><Link href="/todos">Back to todos</Link></>;
}
