import { useState } from "react";
import type { TaskItem } from "../utils/task";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";

export const useTaskActions = (
  tasks: TaskItem[],
  onDeleteTask: (id: string) => void,
  handleOpenModal: () => void
) => {
  const [editTask, setEditTask] = useState<TaskItem | null>(null);

  const handleSeeMore = (id: string) => {
    console.log(`see more ${id}`);
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
      onClick: handleSeeMore,
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

  return { actionButtons, editTask, setEditTask };
};