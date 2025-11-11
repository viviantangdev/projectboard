import { useState } from 'react';
import { IoWarningOutline } from 'react-icons/io5';
import Badge from '../../../shared/components/Badge';
import DeleteItem from '../../../shared/components/DeleteItem';
import Modal from '../../../shared/components/Modal';
import TaskForm from '../../../shared/components/TaskForm';
import TaskView from '../../../shared/components/TaskView';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import { useTaskActions } from '../../../shared/hooks/useTaskActionButtons';
import { useTasks } from '../../../shared/hooks/useTasks';

const DashboardTable = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { tasks, onDeleteTask, onToggleTaskStatus } = useTasks();
  const { actionButtons, editTask, viewTask } = useTaskActions(
    tasks,
    onDeleteTask,
    () => setIsTaskModalOpen(true),
    (id) => setDeleteId(id)
  );

  const { filteredTasks, handleSort, sortBy, sortOrder } = useFilterTasks();

  function handleDeleteTask() {
    if (deleteId) {
      onDeleteTask(deleteId);
      setDeleteId(null);
    }
  }
  function handleCancelDelete() {
    setDeleteId(null);
  }

  return (
    <>
      {/* Table */}
      <div className='relative overflow-x-auto shadow-md tracking-wider rounded'>
        <table className='tableContainer'>
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
                    checked={item.status === 'Completed'}
                    onChange={() => onToggleTaskStatus(item.id, item.status)}
                    className='checkbox'
                  />
                </td>
                <td
                  className={`p-3 ${
                    item.status === 'Completed' && 'line-through text-gray-400'
                  }`}
                >
                  {item.title}
                </td>
                <td
                  className={`p-3 ${item.status === 'Completed' && 'text-gray-400'}`}
                >
                  {item.project.name}
                </td>
                <td className='p-3'>
                  <Badge
                    value={item.priority}
                    colorMap={{
                      High: 'badgeHigh',
                      Medium: 'badgeMedium',
                      Low: 'badgeLow',
                    }}
                  />
                </td>
                <td
                  className={`p-3 ${item.status === 'Completed' && 'text-gray-400'}`}
                >
                  {item.dueDate}
                </td>
                <td className='p-3'>
                  <Badge
                    value={item.status}
                    colorMap={{
                      Completed: 'badgeCompleted',
                      InProgress: 'badgeInProgress',
                      NotStarted: 'badgeNotStarted',
                    }}
                  />
                </td>
                <td>
                  <div className='flex gap-3'>
                    {item.status !== 'Completed' &&
                      actionButtons.map((action, index) => (
                        <button
                          key={index}
                          onClick={() => action.onClick(item.id)}
                          aria-label={action.label}
                          title={action.label}
                          disabled={item.status === 'Completed'}
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
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          title={'Edit task'}
          children={
            <TaskForm task={editTask} setIsModalOpen={setIsTaskModalOpen} />
          }
        />
      )}
      {/* View Modal */}
      {viewTask && (
        <Modal
          isOpen={isTaskModalOpen}
          setIsOpen={setIsTaskModalOpen}
          title={'View task'}
          children={<TaskView task={viewTask} />}
        />
      )}
      {/* Delete Modal */}
      {deleteId && (
        <Modal
          isOpen={deleteId !== null}
          setIsOpen={handleCancelDelete}
          title={'Delete task'}
          icon={<IoWarningOutline />}
          children={
            <DeleteItem
              deleteValue={
                filteredTasks.find((task) => task.id === deleteId)!.title
              }
              onCancel={handleCancelDelete}
              onDelete={handleDeleteTask}
            />
          }
        />
      )}
    </>
  );
};

export default DashboardTable;
