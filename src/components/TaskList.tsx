import { useState } from "react";
import type { Task, TaskFilters } from "../types";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Pick<Task, "title" | "description">>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
}

function TaskCard({ task, onUpdate, onDelete, onToggle }: TaskCardProps) {
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ title: task.title, description: task.description });

  const save = async () => {
    await onUpdate(task.id, editData);
    setEditing(false);
  };

  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-2xl px-6 py-5 flex items-start gap-4
      hover:border-neutral-700 hover:-translate-y-px transition-all
      ${task.completed_at ? "opacity-50" : ""}`}
    >
      {editing ? (
        <div className="flex flex-col gap-2.5 flex-1">
          <input
            className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg font-mono text-sm outline-none focus:border-[#c8f135] w-full placeholder:text-neutral-500"
            value={editData.title}
            onChange={e => setEditData(d => ({ ...d, title: e.target.value }))}
            placeholder="Título"
          />
          <input
            className="bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded-lg font-mono text-sm outline-none focus:border-[#c8f135] w-full placeholder:text-neutral-500"
            value={editData.description}
            onChange={e => setEditData(d => ({ ...d, description: e.target.value }))}
            placeholder="Descrição"
          />
          <div className="flex gap-2">
            <button onClick={save} className="bg-[#c8f135] text-black px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide font-['Syne'] hover:bg-[#d4ff40] cursor-pointer transition-colors">
              Salvar
            </button>
            <button onClick={() => setEditing(false)} className="border border-neutral-700 text-neutral-400 px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide font-['Syne'] hover:text-white hover:border-white cursor-pointer transition-colors">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 min-w-0">
            <div className={`text-sm font-bold truncate font-['Syne'] mb-1 ${task.completed_at ? "line-through" : ""}`}>
              {task.title}
            </div>
            <div className="font-mono text-xs text-neutral-500 truncate">{task.description}</div>
            <div className="font-mono text-[10px] text-neutral-700 mt-2">
              {new Date(task.created_at).toLocaleDateString("pt-BR")}
              {task.completed_at && " · ✓ concluída"}
            </div>
          </div>
          <div className="flex gap-2 items-center shrink-0">
            <button
              onClick={() => onToggle(task.id)}
              className={`border px-3 py-1.5 rounded-lg text-xs font-bold font-mono cursor-pointer transition-colors
                ${task.completed_at
                  ? "border-[#c8f135] text-[#c8f135]"
                  : "border-neutral-700 text-neutral-500 hover:border-[#c8f135] hover:text-[#c8f135]"}`}
            >
              {task.completed_at ? "✓" : "○"}
            </button>
            <button
              onClick={() => { setEditing(true); setEditData({ title: task.title, description: task.description }); }}
              className="border border-neutral-700 text-neutral-500 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide font-['Syne'] hover:text-white hover:border-white cursor-pointer transition-colors"
            >
              editar
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="border border-red-500/40 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold font-mono hover:bg-red-500 hover:text-white cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface TaskListProps {
  tasks: Task[];
  search: TaskFilters;
  onSearch: React.Dispatch<React.SetStateAction<TaskFilters>>;
  onUpdate: (id: string, data: Partial<Pick<Task, "title" | "description">>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onToggle: (id: string) => Promise<void>;
}

export function TaskList({ tasks, search, onSearch, onUpdate, onDelete, onToggle }: TaskListProps) {
  return (
    <>
      <div className="flex gap-3 mb-6">
        <input
          className="bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-[#c8f135] w-full placeholder:text-neutral-500 transition-colors"
          placeholder="buscar por título..."
          value={search.title}
          onChange={e => onSearch(s => ({ ...s, title: e.target.value }))}
        />
        <input
          className="bg-neutral-900 border border-neutral-800 text-white px-4 py-3 rounded-xl font-mono text-sm outline-none focus:border-[#c8f135] w-full placeholder:text-neutral-500 transition-colors"
          placeholder="buscar por descrição..."
          value={search.description}
          onChange={e => onSearch(s => ({ ...s, description: e.target.value }))}
        />
      </div>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <div className="text-center py-16 text-neutral-600">
            <div className="text-5xl mb-4 opacity-30">◻</div>
            <div className="font-mono text-xs tracking-widest">nenhuma task encontrada</div>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} onToggle={onToggle} />
          ))
        )}
      </div>
    </>
  );
}
