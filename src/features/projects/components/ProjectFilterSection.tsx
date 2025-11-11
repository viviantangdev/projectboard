import { useEffect, useMemo } from 'react';
import DropdownSelect from '../../../shared/components/DropdownSelect';
import Input from '../../../shared/components/Input';
import Tag from '../../../shared/components/Tag';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import type { ProjectItem } from '../../../shared/utils/task';
import { useTasks } from '../../../shared/hooks/useTasks';

interface ProjectFilterSectionProps {
  project: ProjectItem; // Optional project prop to disable project filter
}
const ProjectFilterSection = ({ project }: ProjectFilterSectionProps) => {
  const {
    searchTerm,
    onSetSearchTerm,
    filterPriority,
    onSetFilterPriority,
    filterStatus,
    onSetFilterStatus,
    clearAllFilter,
  } = useFilterTasks();
  const { tasks } = useTasks();

  useEffect(() => {
    clearAllFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter tasks by project.id
  const projectTasks = tasks.filter((item) => item.project.id === project.id);

  // Generate priority and status options for the specific project
  const priorityOptions = [
    ...new Set(projectTasks.map((item) => item.priority)),
  ];
  const statusOptions = [...new Set(projectTasks.map((item) => item.status))];

  // Track if any filter is active
  const isFiltered = useMemo(
    () => searchTerm !== '' || filterPriority !== '' || filterStatus !== '',
    [searchTerm, filterPriority, filterStatus]
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
      filterPriority,
      filterStatus,
      onSetSearchTerm,
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

export default ProjectFilterSection;
