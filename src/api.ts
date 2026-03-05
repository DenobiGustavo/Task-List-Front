import type { Task, TaskFilters } from "./types";

const API = "http://localhost:3333";

export async function getTasks(filters: TaskFilters = {}): Promise<Task[]> {
  const params = new URLSearchParams();
  if (filters.title) params.set("title", filters.title);
  if (filters.description) params.set("description", filters.description);
  const res = await fetch(`${API}/tasks?${params}`);
  return res.json();
}

export async function createTask(data: Pick<Task, "title" | "description">): Promise<Task> {
  const res = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id: string, data: Partial<Pick<Task, "title" | "description">>): Promise<Task> {
  const res = await fetch(`${API}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  await fetch(`${API}/tasks/${id}`, { method: "DELETE" });
}

export async function toggleComplete(id: string): Promise<void> {
  await fetch(`${API}/tasks/${id}/complete`, { method: "PATCH" });
}