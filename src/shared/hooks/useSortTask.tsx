import { useState } from 'react';
import type { TaskItem } from '../utils/task';

export type SortOrderType = 'asc' | 'desc';

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
    console.log(`Sorting by ${sortBy}, order: ${sortOrder}`);
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    console.log(`aValue ${aValue}, bValue: ${bValue}`);

    // Handle different types
    if (sortBy === 'project') {
      const aProjectName = a.project.name;
      const bProjectName = b.project.name;
      return sortOrder === 'asc'
        ? aProjectName.localeCompare(bProjectName)
        : bProjectName.localeCompare(aProjectName);
    } else if (sortBy === 'dueDate') {
      // Assuming dueDate is a string in a parseable format (e.g., 'YYYY-MM-DD')
      const aDate = new Date(aValue as string);
      const bDate = new Date(bValue as string);
      return sortOrder === 'asc'
        ? aDate.getTime() - bDate.getTime()
        : bDate.getTime() - aDate.getTime();
    } else {
      // Handle strings (title, priority, status)
      return sortOrder === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    }
  });

  return { sortedData, handleSort, sortBy, sortOrder };
};
