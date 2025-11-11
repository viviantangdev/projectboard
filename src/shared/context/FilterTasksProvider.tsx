import { useMemo, useState } from 'react';
import { FilterTasksContext } from '../hooks/useFilterTasks';
import { useSortTasks } from '../hooks/useSortTask';
import { useTasks } from '../hooks/useTasks';

interface FilterTasksProviderProps {
  children: React.ReactNode;
}
export const FilterTasksProvider = ({ children }: FilterTasksProviderProps) => {
  const { tasks } = useTasks();
  const { sortedData, handleSort, sortBy, sortOrder } = useSortTasks(tasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredTasks = useMemo(() => {
    return sortedData
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (item) =>
          (filterProject === '' || item.project.name === filterProject) &&
          (filterPriority === '' || item.priority === filterPriority) &&
          (filterStatus === '' || item.status === filterStatus)
      );
  }, [sortedData, searchTerm, filterPriority, filterProject, filterStatus]);

  function onSetSearchTerm(value: string) {
    setSearchTerm(value);
  }
  function onSetFilterProject(value: string) {
    setFilterProject(value);
  }
  function onSetFilterPriority(value: string) {
    setFilterPriority(value);
  }
  function onSetFilterStatus(value: string) {
    setFilterStatus(value);
  }

  function clearAllFilter(){
    setSearchTerm('');
    setFilterProject('');
    setFilterPriority('');
    setFilterStatus('');
  }

  return (
    <FilterTasksContext.Provider
      value={{
        tasks,
        searchTerm,
        onSetSearchTerm,
        filteredTasks,
        filterProject,
        onSetFilterProject,
        filterPriority,
        onSetFilterPriority,
        filterStatus,
        onSetFilterStatus,
        // expose sorting controls so components use the provider's sorting state
        handleSort,
        sortBy,
        sortOrder,
        clearAllFilter
      }}
    >
      {children}
    </FilterTasksContext.Provider>
  );
};
