import { createContext } from 'react';
import type { TaskItem } from '../../../shared/utils/task';

type TasksContextType = {
  tasks: TaskItem[];
  onCreateTask: (data: TaskItem) => void;
  onUpdateTask: (id: string, data: TaskItem) => void;
  onDeleteTask: (id: string) => void;
  onToggleTaskStatus: (id: string, currentStatus: TaskItem['status']) => void;
  setTasks: (data: TaskItem[] | ((prev: TaskItem[]) => TaskItem[])) => void;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);
