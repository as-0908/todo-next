"use client";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

export default function TodoList() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      const { data, error } = await supabase.from("todos").select("*");

      if (error) {
        console.error("データ取得エラー:", error);
      } else {
        setTodos(data || []);
      }
      setLoading(false);
    }

    fetchTodos();
  }, []);

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) {
        console.error("削除エラー:", error);
        throw error;
      }

      // 削除後にリストを更新
      setTodos(todos.filter((todo) => todo.id !== id));
      router.refresh();
    } catch (error) {
      alert("削除中にエラーが発生しました");
    }
  }

  if (loading) {
    return <div>読み込み中...</div>;
  }
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} className="mb-4 p-4 border rounded">
          <h2 className="text-xl font-bold">{todo.title}</h2>
          <p className="mb-4">{todo.description}</p>
          <p className="mb-4">ステータス: {todo.status}</p>
          <div className="space-x-4">
            <Link
              href={`/edit/${todo.id}`} // パスを修正
              className="bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
              編集
            </Link>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              削除
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
