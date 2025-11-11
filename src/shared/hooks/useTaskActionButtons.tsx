import { useState } from 'react';
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb';
import type { TaskItem } from '../utils/task';

export const useTaskActions = (
  tasks: TaskItem[],
  onDeleteTask: (id: string) => void,
  handleOpenModal: () => void
) => {
  const [editTask, setEditTask] = useState<TaskItem | null>(null);
  const [viewTask, setViewTask] = useState<TaskItem | null>(null);

  const handleSeeMore = (task: TaskItem) => {
    handleOpenModal();
    setViewTask(task);
  };

  const handleEdit = (task: TaskItem) => {
    handleOpenModal();
    setEditTask(task);
  };

  const handleDelete = (id: string) => {
    onDeleteTask(id);
  };

  const actionButtons = [
    {
      icon: <TbEye size={15} />,
      label: 'View',
      onClick: (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task) handleSeeMore(task);
      },
    },
    {
      icon: <TbEdit size={15} />,
      label: 'Edit',
      onClick: (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task) handleEdit(task);
      },
    },
    {
      icon: <TbTrash size={15} />,
      label: 'Delete',
      onClick: handleDelete,
    },
  ];

  return { actionButtons, editTask, viewTask };
};
