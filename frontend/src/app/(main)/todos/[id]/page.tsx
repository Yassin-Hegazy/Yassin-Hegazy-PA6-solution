import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTodo } from "@/lib/todos";
import TodoDetails from "../../../_components/TodoDetails";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const todo = await getTodo(id);
  return { title: todo?.title ?? "Todo not found" };
}

export default async function TodoPage({ params }: Props) {
  const { id } = await params;
  const todo = await getTodo(id);
  if (!todo) notFound();
  return <section className="card"><h1>Todo details</h1><TodoDetails todo={todo} /></section>;
}
