import DropdownSelect from '../../../shared/components/DropdownSelect';
import Input from '../../../shared/components/Input';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import type { ProjectItem } from '../../../shared/utils/task';
import { useTasks } from '../../dashboard/context/useTasks';

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
    onSetFilteredStatus,
  } = useFilterTasks();
  const { tasks } = useTasks();

  // Filter tasks by project.id 
  const projectTasks = tasks.filter((item) => item.project.id === project.id);

  // Generate priority and status options for the specific project
  const priorityOptions = [
    ...new Set(projectTasks.map((item) => item.priority)),
  ];
  const statusOptions = [...new Set(projectTasks.map((item) => item.status))];

  return (
    <div className='flex flex-col sm:flex-row gap-4 mb-6'>
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
        onChange={onSetFilteredStatus}
        options={statusOptions}
        defaultOption='All Statuses'
      />
    </div>
  );
};

export default ProjectFilterSection;
