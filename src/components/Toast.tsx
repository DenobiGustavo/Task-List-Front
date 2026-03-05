import type { ToastItem } from "../types";

interface ToastProps {
  toasts: ToastItem[];
}

export function Toast({ toasts }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`bg-neutral-800 border border-neutral-700 px-5 py-3 rounded-xl font-mono text-xs min-w-[220px]
            ${t.type === "error" ? "border-l-4 border-l-red-500" : "border-l-4 border-l-[#c8f135]"}`}
        >
          {t.msg}
        </div>
      ))}
    </div>
  );
}
