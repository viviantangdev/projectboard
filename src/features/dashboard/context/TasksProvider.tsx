import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import type { TaskItem } from '../../../shared/utils/task';
import { TasksContext } from './TasksContext';

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<TaskItem[]>('TASKS', [
    {
      id: '1',
      title: 'Task 1',
      content: 'Content 1',
      project: 'Home',
      priority: 'High',
      dueDate: '2020-01-01',
      status: 'Todo',
    },
    {
      id: '2',
      title: 'Task 2',
      content: 'Content 2',
      project: 'Home',
      priority: 'High',
      dueDate: '2020-01-01',
      status: 'Todo',
    },
    {
      id: '3',
      title: 'Task 3',
      content: 'Content 3',
      project: 'Home',
      priority: 'High',
      dueDate: '2020-01-01',
      status: 'Todo',
    },
  ]);

  function onCreateTask({
    title,
    content,
    project,
    priority,
    dueDate,
    status,
  }: TaskItem) {
    console.log('ööööö')
    setTasks((prev) => [
      ...prev,
      {
        id: uuidV4(),
        title,
        content,
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
          ? { ...task, status: currentStatus === 'Done' ? 'Todo' : 'Done' }
          : task
      )
    );
  }

  return (
    <TasksContext.Provider
      value={{
        tasks,
        onCreateTask,
        onUpdateTask,
        onDeleteTask,
        onToggleTaskStatus,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
