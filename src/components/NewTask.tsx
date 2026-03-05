import { useState } from "react";
import type { Task } from "../types";

interface NewTaskProps {
  onCreate: (data: Pick<Task, "title" | "description">) => Promise<void>;
  onToast: (msg: string, type?: "ok" | "error") => void;
}

export function NewTask({ onCreate, onToast }: NewTaskProps) {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleCreate = async () => {
    if (!task.title || !task.description) return onToast("Preencha título e descrição", "error");
    await onCreate(task);
    setTask({ title: "", description: "" });
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7">
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-1 h-5 bg-[#c8f135] rounded-sm" />
        <h2 className="text-lg font-bold font-['Syne']">Nova Tarefa</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input
          className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-[#c8f135] placeholder:text-neutral-500 transition-colors"
          placeholder="Título da tarefa"
          value={task.title}
          onChange={e => setTask(d => ({ ...d, title: e.target.value }))}
        />
        <input
          className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-[#c8f135] placeholder:text-neutral-500 transition-colors"
          placeholder="Descrição"
          value={task.description}
          onChange={e => setTask(d => ({ ...d, description: e.target.value }))}
        />
      </div>

      <button
        onClick={handleCreate}
        className="bg-[#c8f135] text-black px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest font-['Syne'] hover:bg-[#d4ff40] hover:-translate-y-px transition-all cursor-pointer"
      >
        Criar Tarefa
      </button>
    </div>
  );
}
