"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function TodoForm({ todo = null }) {
  const router = useRouter();
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      title,
      description,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      if (todo) {
        const { error } = await supabase
          .from("todos")
          .update(data)
          .eq("id", todo.id);

        if (error) {
          console.error("更新エラーの詳細:", error);
          throw error;
        }
        router.push(`/edit/${todo.id}`);
      } else {
        console.log("送信するデータ:", data);
        const { error, data: newTodo } = await supabase
          .from("todos")
          .insert([data])
          .select();

        if (error) {
          console.error("作成エラーの詳細:", error);
          throw error;
        }

        console.log("作成されたTodo:", newTodo);
        await new Promise((resolve) => setTimeout(resolve, 500));
        router.refresh();
        router.replace("/");
      }
    } catch (error: any) {
      console.error("エラーの完全な詳細:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      alert(`保存中にエラーが発生しました: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2">タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block mb-2">説明</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "保存中..." : todo ? "更新" : "作成"}
        </button>
        <button
          type="button"
          onClick={() => router.push(todo ? `/edit/${todo.id}` : "/")}
          className="bg-gray-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
