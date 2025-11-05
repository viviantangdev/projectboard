import { useState } from 'react';
import { TbEdit, TbEye, TbTrash } from 'react-icons/tb';
import Modal from '../../../shared/components/Modal';
import type { TaskItem } from '../../../shared/utils/task';
import { useTasks } from '../context/useTasks';
import Badge from './Badge';
import EditTaskModalContent from './EditTaskModalContent';

type SortOrderType = 'asc' | 'desc';

const DashboardTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState<keyof TaskItem>('id');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc'); // Default ascending order
  const [editTask, setEditTask] = useState<TaskItem | null>(null); // Track task to edit
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);

  function handleOpenModal() {
    setIsEditTaskModalOpen(true);
  }
  const { tasks, onDeleteTask, onToggleTaskStatus } = useTasks();

  const handleSeeMore = (id: string) => {
    console.log(`see more ${id}`);
  };
  const handleEdit = (task: TaskItem) => {
    handleOpenModal();
    setEditTask(task); // Open modal with task data
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
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className='select'
        >
          <option value=''>All Projects</option>
          {[...new Set(tasks.map((item) => item.project))].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
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
              <th
                onClick={() => handleSort('project')}
                className='tableHeaderItem'
              >
                Project
                {sortBy === 'project' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
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
                Status{' '}
                {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th></th>
            </tr>
          </thead>
          {/*Body */}
          <tbody>
            {sortedData
              .filter((item) =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .filter(
                (item) =>
                  (filterProject === '' || item.project === filterProject) &&
                  (filterPriority === '' || item.priority === filterPriority) &&
                  (filterStatus === '' || item.status === filterStatus)
              )
              .map((item) => (
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
                    className={`p-3 ${
                      item.status === 'Done' && 'text-gray-400'
                    }`}
                  >
                    {item.project}
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
                    className={`p-3 ${
                      item.status === 'Done' && 'text-gray-400'
                    }`}
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
                            className='px-2 cursor-pointer hover:text-sky-500 transition-smooth'
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
              setIsModalOpen={() => setEditTask(null)}
            />
          }
        />
      )}
    </div>
  );
};

export default DashboardTable;
