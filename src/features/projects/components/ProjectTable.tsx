import { useMemo, useState } from 'react';
import Badge from '../../../shared/components/Badge';
import Modal from '../../../shared/components/Modal';
import { useSortTasks } from '../../../shared/hooks/useSortTask';
import { useTaskActions } from '../../../shared/hooks/useTaskActionButtons';
import type { ProjectItem } from '../../../shared/utils/task';
import EditTaskModalContent from '../../dashboard/components/EditTaskModalContent';
import { useTasks } from '../../dashboard/context/useTasks';

interface ProjectTableProps {
  project: ProjectItem;
}
const ProjectTable = ({ project }: ProjectTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const { tasks, onDeleteTask, onToggleTaskStatus } = useTasks();
  const { sortedData, handleSort, sortBy, sortOrder } = useSortTasks(tasks); // Use the custom hook
  const { actionButtons, editTask } = useTaskActions(tasks, onDeleteTask, () =>
    setIsEditTaskModalOpen(true)
  );
  // Filter project
  const filteredTasks = useMemo(() => {
    if (!project) return []; // Return empty array if project is not found
    return sortedData
      .filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (item) =>
          (filterPriority === '' || item.priority === filterPriority) &&
          (filterStatus === '' || item.status === filterStatus) &&
          item.project.name === project.name
      );
  }, [sortedData, searchTerm, filterPriority, filterStatus, project]);

  return (
    <div className='container max-w-4xl'>
      {/* Filter and Search Controls */}
      <div className='flex flex-col sm:flex-row gap-4 mb-6'>
        <input
          type='text'
          placeholder='Search by task'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='searchInput'
        />

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className='select'
        >
          <option value=''>All Priorities</option>
          {[...new Set(tasks.map((item) => item.priority))].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='select'
        >
          <option value=''>All Statuses</option>
          {[...new Set(tasks.map((item) => item.status))].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className='relative overflow-x-auto shadow-md text-xs tracking-wider rounded '>
        <table className='w-full min-w-[640px] tableContainer'>
          {/*Header*/}
          <thead>
            <tr className='p-3 tableHeader'>
              <th></th>

              <th
                onClick={() => handleSort('title')}
                className='tableHeaderItem'
              >
                Task {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className='tableHeaderItem'>Project</th>
              <th
                onClick={() => handleSort('priority')}
                className='tableHeaderItem'
              >
                Priority
                {sortBy === 'priority' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('dueDate')}
                className='tableHeaderItem'
              >
                Due date
                {sortBy === 'dueDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('status')}
                className='tableHeaderItem'
              >
                Status
                {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th></th>
            </tr>
          </thead>
          {/*Body */}
          <tbody>
            {filteredTasks.map((item) => (
              <tr key={item.id} className='tableRow'>
                <td className='p-3'>
                  <input
                    type='checkbox'
                    checked={item.status === 'Done'}
                    onChange={() => onToggleTaskStatus(item.id, item.status)}
                    className='h-5 w-5 checkbox'
                  />
                </td>
                <td
                  className={`p-3 ${
                    item.status === 'Done' && 'line-through text-gray-400'
                  }`}
                >
                  {item.title}
                </td>
                <td
                  className={`p-3 ${item.status === 'Done' && 'text-gray-400'}`}
                >
                  {item.project.name}
                </td>
                <td className='p-3'>
                  <Badge
                    value={item.priority}
                    colorMap={{
                      High:
                        item.status === 'Done'
                          ? 'text-gray-400 bg-gray-200'
                          : 'text-red-700 bg-red-100',
                      Medium:
                        item.status === 'Done'
                          ? 'text-gray-400 bg-gray-200'
                          : 'text-amber-700 bg-amber-100',
                      Low:
                        item.status === 'Done'
                          ? 'text-gray-400 bg-gray-200'
                          : 'text-emerald-700 bg-emerald-100',
                    }}
                  />
                </td>
                <td
                  className={`p-3 ${item.status === 'Done' && 'text-gray-400'}`}
                >
                  {item.dueDate}
                </td>
                <td className='p-3'>
                  <Badge
                    value={item.status}
                    colorMap={{
                      Done: 'text-emerald-700 bg-emerald-100 ',
                      Todo: 'text-zinc-700 bg-sky-100 ',
                    }}
                  />
                </td>
                <td>
                  <div className='flex gap-3'>
                    {item.status !== 'Done' &&
                      actionButtons.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => action.onClick(item.id)}
                          aria-label={action.label}
                          title={action.label}
                          disabled={item.status === 'Done'}
                          className='iconButton'
                        >
                          {action.icon}
                        </button>
                      ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editTask && (
        <Modal
          isOpen={isEditTaskModalOpen}
          setIsOpen={() => setIsEditTaskModalOpen(false)}
          title={'Edit task'}
          children={
            <EditTaskModalContent
              task={editTask}
              setIsModalOpen={setIsEditTaskModalOpen}
            />
          }
        />
      )}
    </div>
  );
};

export default ProjectTable;
