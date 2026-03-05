type TabId = "list" | "new" | "csv";

interface TabsProps {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: "list", label: "Tarefas" },
  { id: "new",  label: "+ Nova" },
  { id: "csv",  label: "↑ CSV" },
];

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 mb-8 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest font-['Syne'] transition-all cursor-pointer
            ${active === tab.id
              ? "bg-[#c8f135] text-black"
              : "text-neutral-500 hover:text-white hover:bg-neutral-800"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
