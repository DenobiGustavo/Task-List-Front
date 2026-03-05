import { useState } from "react";
import type { ToastItem } from "../types";

let toastId = 0;

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = (msg: string, type: ToastItem["type"] = "ok") => {
    const id = ++toastId;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3000);
  };

  return { toasts, toast };
}