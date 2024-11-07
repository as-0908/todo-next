"use client";

import TodoList from "@/components/TodoList";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">TODOリスト</h1>
      <Link
        href="/create"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        新規作成
      </Link>
      <TodoList />
    </div>
  );
}
