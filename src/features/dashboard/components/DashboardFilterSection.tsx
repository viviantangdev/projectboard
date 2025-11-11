import { useEffect } from 'react';
import DropdownSelect from '../../../shared/components/DropdownSelect';
import Input from '../../../shared/components/Input';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import { useTasks } from '../context/useTasks';

const DashboardFilterSection = () => {
  const { tasks } = useTasks();

  const {
    searchTerm,
    onSetSearchTerm,
    filterProject,
    onSetFilterProject,
    onSetFilterPriority,
    filterPriority,
    filterStatus,
    onSetFilteredStatus,
    clearAllFilter,
  } = useFilterTasks();

  useEffect(() => {
    clearAllFilter();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = [...new Set(tasks.map((item) => item.project.name))];
  const priorityOptions = [...new Set(tasks.map((item) => item.priority))];
  const statusOptions = [...new Set(tasks.map((item) => item.status))];

  return (
    <div className='flex flex-col sm:flex-row gap-4 w-full'>
      <Input
        value={searchTerm}
        onChange={onSetSearchTerm}
        placeHolder={'Search by task'}
      />

      <div className='flex gap-4 w-full'>
        <DropdownSelect
          value={filterProject}
          onChange={onSetFilterProject}
          options={projectOptions}
          defaultOption='All Projects'
        />
        <DropdownSelect
          value={filterPriority}
          onChange={onSetFilterPriority}
          options={priorityOptions}
          defaultOption='All Priorities'
        />
        <DropdownSelect
          value={filterStatus}
          onChange={onSetFilteredStatus}
          options={statusOptions}
          defaultOption='All Statuses'
        />
      </div>
    </div>
  );
};

export default DashboardFilterSection;
