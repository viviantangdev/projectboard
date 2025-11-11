import { createContext, useContext } from 'react';
import type { SortOrderType } from '../hooks/useSortTask';
import type { TaskItem } from '../utils/task';

type FilterTasksContextType = {
  tasks: TaskItem[];
  searchTerm: string;
  onSetSearchTerm: (value: string) => void;
  filteredTasks: TaskItem[];
  filterProject: string;
  onSetFilterProject: (value: string) => void;
  filterPriority: string;
  onSetFilterPriority: (value: string) => void;
  filterStatus: string;
  onSetFilterStatus: (value: string) => void;
  // Sorting control exposed from the provider
  handleSort: (key: keyof TaskItem) => void;
  sortBy: keyof TaskItem;
  sortOrder: SortOrderType;
  clearAllFilter: () => void;
};

export const FilterTasksContext = createContext<
  FilterTasksContextType | undefined
>(undefined);

export const useFilterTasks = () => {
  const context = useContext(FilterTasksContext);
  if (!context) {
    throw new Error('useFilterTasks must be used within a FilterTasksProvider');
  }
  return context;
};
