import { useEffect, useState } from 'react';
import Badge from '../../../shared/components/Badge';
import DeleteItem from '../../../shared/components/DeleteItem';
import Modal from '../../../shared/components/Modal';
import TaskForm from '../../../shared/components/TaskForm';
import TaskView from '../../../shared/components/TaskView';
import { useFilterTasks } from '../../../shared/hooks/useFilterTasks';
import { useTaskActions } from '../../../shared/hooks/useTaskActionButtons';
import type { ProjectItem } from '../../../shared/utils/task';
import { useTasks } from '../../dashboard/context/useTasks';

interface ProjectTableProps {
  project: ProjectItem;
}
const ProjectTable = ({ project }: ProjectTableProps) => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { onDeleteTask, onToggleTaskStatus } = useTasks();

  // project-specific tasks are handled by the FilterTasksProvider via onSetFilterProject
  const { filteredTasks, handleSort, sortBy, sortOrder, onSetFilterProject } =
    useFilterTasks();

  const { actionButtons, editTask, viewTask } = useTaskActions(
    filteredTasks,
    onDeleteTask,
    () => setIsTaskModalOpen(true),
    (id) => setDeleteId(id)
  );

  useEffect(() => {
    onSetFilterProject(project.name);
  }, [project.name, onSetFilterProject]);

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
      <div className='relative overflow-x-auto shadow-md  tracking-wider rounded '>
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
                    className='checkbox'
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
                      High: 'badgeHigh',
                      Medium: 'badgeMedium',
                      Low: 'badgeLow',
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
                      Done: 'badgeDone',
                      Ongoing: 'badgeOngoing',
                      Todo: 'badgeTodo',
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
          children={
            <DeleteItem
              onCancel={handleCancelDelete}
              onDelete={handleDeleteTask}
              deleteValue={
                filteredTasks.find((task) => task.id === deleteId)!.title
              }
            />
          }
        />
      )}
    </>
  );
};

export default ProjectTable;
