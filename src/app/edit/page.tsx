import { TodoForm } from "@/components/TodoForm";
import { supabase } from "@/lib/supabase";

export default async function EditPage({ params }: { params: { id: string } }) {
  const { data: todo } = await supabase
    .from("todos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!todo) {
    return <div>TODOが見つかりません</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODO編集</h1>
      <TodoForm todo={todo} />
    </div>
  );
}
