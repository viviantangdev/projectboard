import { useState } from 'react';
import type { TaskItem } from '../utils/task';

type SortOrderType = 'asc' | 'desc';

export const useSortTasks = (tasks: TaskItem[]) => {
  const [sortBy, setSortBy] = useState<keyof TaskItem>('id');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc'); // Default ascending order

  // Function to handle sorting
  const handleSort = (key: keyof TaskItem) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  // Sorting logic based on sortBy and sortOrder
  const sortedData = [...tasks].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  return { sortedData, handleSort, sortBy, sortOrder };
};
