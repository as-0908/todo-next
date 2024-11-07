import { TodoForm } from "@/components/TodoForm";

export default function CreatePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO作成</h1>
      <TodoForm />
    </div>
  );
}
