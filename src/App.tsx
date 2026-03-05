import { useState } from "react";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TaskList } from "./components/TaskList";
import { NewTask } from "./components/NewTask";
import { ImportCSV } from "./components/ImportCSV";
import { Toast } from "./components/Toast";
import { useTasks } from "./hooks/useTasks";
import { useToast } from "./hooks/useToast";
import type { Task } from "./types";

type TabId = "list" | "new" | "csv";

export default function App() {
  const [tab, setTab] = useState<TabId>("list");
  const { tasks, search, setSearch, create, update, remove, toggle, fetchTasks } = useTasks();
  const { toasts, toast } = useToast();

  const completed = tasks.filter(t => t.completed_at).length;

  const handleCreate = async (data: Pick<Task, "title" | "description">) => {
    await create(data);
    toast("Task criada!");
    setTab("list");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <Header total={tasks.length} completed={completed} />
        <Tabs active={tab} onChange={setTab} />

        {tab === "list" && (
          <TaskList
            tasks={tasks}
            search={search}
            onSearch={setSearch}
            onUpdate={async (id, data) => { await update(id, data); toast("Task atualizada!"); }}
            onDelete={async (id) => { await remove(id); toast("Task removida"); }}
            onToggle={toggle}
          />
        )}

        {tab === "new" && (
          <NewTask onCreate={handleCreate} onToast={toast} />
        )}

        {tab === "csv" && (
          <ImportCSV
            onImported={() => {
              fetchTasks();
              setTab("list");
    }}
    onToast={toast}
/>
        )}
      </div>

      <Toast toasts={toasts} />
    </div>
  );
}
