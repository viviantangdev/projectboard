import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TasksProvider } from './TasksProvider';
import { useTasks } from '../hooks/useTasks';

// Helper to render hook with provider
const renderWithProvider = <T,>(hook: () => T) => {
  return renderHook(hook, { wrapper: TasksProvider });
};

describe('TasksProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty tasks', () => {
    const { result } = renderWithProvider(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it('should create a task', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'New Task',
        details: 'Task details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'High',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      });
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('New Task');
    expect(result.current.tasks[0].status).toBe('NotStarted');
  });

  it('should update a task', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'Original Title',
        details: 'Details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'Low',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      });
    });

    const createdTask = result.current.tasks[0];
    expect(createdTask.title).toBe('Original Title');

    act(() => {
      result.current.onUpdateTask(createdTask.id, {
        ...createdTask,
        title: 'Updated Title',
        priority: 'High',
      });
    });

    const updatedTask = result.current.tasks.find((t) => t.id === createdTask.id);
    expect(updatedTask?.title).toBe('Updated Title');
    expect(updatedTask?.priority).toBe('High');
  });

  it('should delete a task', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'Task to Delete',
        details: 'Details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'Medium',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      });
    });

    const taskId = result.current.tasks[0].id;
    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.onDeleteTask(taskId);
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it('should toggle task status from NotStarted to Completed', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'Task',
        details: 'Details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'Medium',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      });
    });

    const taskId = result.current.tasks[0].id;
    expect(result.current.tasks[0].status).toBe('NotStarted');

    act(() => {
      result.current.onToggleTaskStatus(taskId, 'NotStarted');
    });

    const toggledTask = result.current.tasks.find((t) => t.id === taskId);
    expect(toggledTask?.status).toBe('Completed');
  });

  it('should toggle task status from Completed to NotStarted', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'Task',
        details: 'Details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'Medium',
        dueDate: '2025-12-31',
        status: 'Completed',
      });
    });

    const taskId = result.current.tasks[0].id;
    expect(result.current.tasks[0].status).toBe('Completed');

    act(() => {
      result.current.onToggleTaskStatus(taskId, 'Completed');
    });

    const toggledTask = result.current.tasks.find((t) => t.id === taskId);
    expect(toggledTask?.status).toBe('NotStarted');
  });

  it('should persist tasks to localStorage', () => {
    const { result } = renderWithProvider(() => useTasks());

    act(() => {
      result.current.onCreateTask({
        id: '1',
        title: 'Task',
        details: 'Details',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'High',
        dueDate: '2025-12-31',
        status: 'NotStarted',
      });
    });

    const stored = JSON.parse(localStorage.getItem('TASKS') || '[]');
    expect(stored).toHaveLength(1);
    expect(stored[0].title).toBe('Task');
  });

  it('should setTasks with new array', () => {
    const { result } = renderWithProvider(() => useTasks());

    const newTasks = [
      {
        id: '1',
        title: 'Task 1',
        details: 'Details 1',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'High' as const,
        dueDate: '2025-12-31',
        status: 'NotStarted' as const,
      },
      {
        id: '2',
        title: 'Task 2',
        details: 'Details 2',
        project: { id: 'p1', name: 'Project 1' },
        priority: 'Medium' as const,
        dueDate: '2025-12-31',
        status: 'InProgress' as const,
      },
    ];

    act(() => {
      result.current.setTasks(newTasks);
    });

    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[0].title).toBe('Task 1');
    expect(result.current.tasks[1].title).toBe('Task 2');
  });

  it('should handle multiple operations in sequence', () => {
    const { result } = renderWithProvider(() => useTasks());

    // Create 3 tasks
    const taskIds: string[] = [];
    act(() => {
      for (let i = 1; i <= 3; i++) {
        result.current.onCreateTask({
          id: `${i}`,
          title: `Task ${i}`,
          details: `Details ${i}`,
          project: { id: 'p1', name: 'Project 1' },
          priority: 'Medium',
          dueDate: '2025-12-31',
          status: 'NotStarted',
        });
      }
    });

    expect(result.current.tasks).toHaveLength(3);
    taskIds.push(result.current.tasks[0].id);
    taskIds.push(result.current.tasks[1].id);
    taskIds.push(result.current.tasks[2].id);

    // Update task 2
    act(() => {
      result.current.onUpdateTask(taskIds[1], {
        ...result.current.tasks[1],
        title: 'Task 2 - Updated',
        priority: 'High',
        status: 'InProgress',
      });
    });

    // Delete task 1
    act(() => {
      result.current.onDeleteTask(taskIds[0]);
    });

    expect(result.current.tasks).toHaveLength(2);
    expect(result.current.tasks[0].id).toBe(taskIds[1]);
    expect(result.current.tasks[0].title).toBe('Task 2 - Updated');
  });
});
