import { useState, useEffect } from "react";
import type { Task, TaskFilters } from "../types";
import * as api from "../api";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState<TaskFilters>({ title: "", description: "" });

  const fetchTasks = async () => {
    const data = await api.getTasks(search);
    setTasks(data);
  };

  useEffect(() => { fetchTasks(); }, [search]);

  const create = async (data: Pick<Task, "title" | "description">) => {
    await api.createTask(data);
    fetchTasks();
  };

  const update = async (id: string, data: Partial<Pick<Task, "title" | "description">>) => {
    await api.updateTask(id, data);
    fetchTasks();
  };

  const remove = async (id: string) => {
    await api.deleteTask(id);
    fetchTasks();
  };

  const toggle = async (id: string) => {
    await api.toggleComplete(id);
    fetchTasks();
  };

  return { tasks, search, setSearch, create, update, remove, toggle, fetchTasks};
}