export interface Task {
  id: string;
  title: string;
  description: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskFilters {
  title?: string;
  description?: string;
}

export interface ToastItem {
  id: number;
  msg: string;
  type: "ok" | "error";
}