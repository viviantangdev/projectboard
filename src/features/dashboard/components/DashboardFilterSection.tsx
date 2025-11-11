import { useEffect, useMemo } from 'react';
import DropdownSelect from '../../../shared/components/DropdownSelect';
import Input from '../../../shared/components/Input';
import Tag from '../../../shared/components/Tag';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import { useTasks } from '../../../shared/hooks/useTasks';

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
    onSetFilterStatus,
    clearAllFilter,
  } = useFilterTasks();

  // Initialize filters on mount
  useEffect(() => {
    clearAllFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectOptions = [...new Set(tasks.map((item) => item.project.name))];
  const priorityOptions = [...new Set(tasks.map((item) => item.priority))];
  const statusOptions = [...new Set(tasks.map((item) => item.status))];

  // Track if any filter is active
  const isFiltered = useMemo(
    () =>
      searchTerm !== '' ||
      filterProject !== '' ||
      filterPriority !== '' ||
      filterStatus !== '',
    [searchTerm, filterProject, filterPriority, filterStatus]
  );

  // Filter tags configuration
  const filterTags = useMemo(
    () => [
      {
        name: searchTerm,
        onClick: () => onSetSearchTerm(''),
        isActive: searchTerm !== '',
      },
      {
        name: filterProject,
        onClick: () => onSetFilterProject(''),
        isActive: filterProject !== '',
      },
      {
        name: filterPriority,
        onClick: () => onSetFilterPriority(''),
        isActive: filterPriority !== '',
      },
      {
        name: filterStatus,
        onClick: () => onSetFilterStatus(''),
        isActive: filterStatus !== '',
      },
    ],
    [
      searchTerm,
      filterProject,
      filterPriority,
      filterStatus,
      onSetSearchTerm,
      onSetFilterProject,
      onSetFilterPriority,
      onSetFilterStatus,
    ]
  );

  return (
    <div className='flex flex-col gap-3'>
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
            onChange={onSetFilterStatus}
            options={statusOptions}
            defaultOption='All Statuses'
          />
        </div>
      </div>
      {isFiltered && (
        <div className='flex flex-wrap gap-2'>
          <Tag
            name='Clear all'
            onClick={clearAllFilter}
            aria-label='Clear all filters'
          />
          {filterTags.map(
            (tag, index) =>
              tag.isActive && (
                <Tag
                  key={index}
                  name={tag.name}
                  onClick={tag.onClick}
                  aria-label={`Remove ${tag.name} filter`}
                />
              )
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardFilterSection;
