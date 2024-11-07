"use client";
import { TodoForm } from "@/components/TodoForm";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Todo } from "@/types";

export default function EditPage() {
  const params = useParams();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchTodo() {
      try {
        const { data, error } = await supabase
          .from("todos")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;

        if (isMounted) {
          setTodo(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("TODOの取得エラー:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTodo();

    return () => {
      isMounted = false; // クリーンアップ関数
    };
  }, [params.id]);
  if (loading) {
    return <div>読み込み中...</div>;
  }

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
