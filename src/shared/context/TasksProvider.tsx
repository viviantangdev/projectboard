import { useEffect } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TasksContext } from '../hooks/useTasks';
import type { TaskItem } from '../utils/task';

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>('TASKS', []);
  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
    console.log('Updated tasks:', tasks); // Log updated state
  }, [tasks]);

  function onAddTask({
    title,
    details,
    project,
    priority,
    dueDate,
    status,
  }: TaskItem) {
    setTasks((prev) => [
      ...prev,
      {
        id: uuidV4(),
        title,
        details,
        project,
        priority,
        dueDate,
        status,
      },
    ]);
  }

  function onUpdateTask(id: string, { ...data }: TaskItem) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  }

  function onDeleteTask(id: string) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function onToggleTaskStatus(id: string, currentStatus: TaskItem['status']) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                currentStatus === 'Completed' ? 'NotStarted' : 'Completed',
            }
          : task
      )
    );
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        onAddTask,
        onUpdateTask,
        onDeleteTask,
        onToggleTaskStatus,
        setTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
