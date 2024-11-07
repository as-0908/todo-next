import { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => void;
  deleteTodo: (id: string) => void;
}

export function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <li className="flex gap-3 items-center">
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={(e) => toggleTodo(todo.id, e.target.checked)}
        className="cursor-pointer peer"
      />
      <label className="cursor-pointer peer-checked:line-through peer-checked:text-slate-500">
        {todo.title}
      </label>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
      >
        Delete
      </button>
    </li>
  );
}
