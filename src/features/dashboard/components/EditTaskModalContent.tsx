import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Badge from '../../../shared/components/Badge';
import Modal from '../../../shared/components/Modal';
import SingleInputModalContent from '../../../shared/components/SingleInputModalContent';
import {
  priorities,
  statuses,
  type PriorityType,
  type ProjectItem,
  type StatusType,
  type TaskItem,
} from '../../../shared/utils/task';
import { useProjects } from '../../projects/context/useProjects';
import { useTasks } from '../context/useTasks';

interface EditTaskModalContentProps {
  task: TaskItem;
  setIsModalOpen: (isOpen: boolean) => void;
}

const EditTaskModalContent = ({
  task,
  setIsModalOpen,
}: EditTaskModalContentProps) => {
  const { onUpdateTask } = useTasks();
  const { projects, addProject } = useProjects();
  const [title, setTitle] = useState<string>(task.title);
  const [details, setContent] = useState<string>(task.details);
  const [project, setProject] = useState<ProjectItem>({
    id: task.project.id,
    name: task.project.name,
  });
  const [priority, setPriority] = useState<PriorityType>(task.priority);
  const [dueDate, setDueDate] = useState<string>(task.dueDate);
  const [status, setStatus] = useState<StatusType>(task.status);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Reset error message
    setErrors({});

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = '* Title is required';
    if (!details) newErrors.details = '* Details is required';
    if (!project) newErrors.project = '* Project is required';
    if (!priority) newErrors.priority = '* Select priority';
    if (!dueDate) newErrors.dueDate = '* Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if all required fields are valid
    if (title && details && project && priority && dueDate) {
      // Update task
      onUpdateTask(task.id, {
        id: task.id,
        title,
        details,
        project,
        priority,
        dueDate,
        status,
      });
      setIsModalOpen(false); // Close modal
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 py-5'>
      {/*Title & Details */}
      <div className='flex flex-col gap-5'>
        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='title' className='text-sm'>
              Title:
            </label>
            {errors.title && (
              <span className='text-xs text-red-500'>{errors.title}</span>
            )}
          </div>
          <textarea
            className='w-full resize-none h-auto outline-none text-sm placeholder:italic'
            placeholder='Title: e.g Pay bills'
            value={title}
            onChange={(e) => {
              const target = e.target;
              target.style.height = 'auto'; // Reset height to recalculate
              target.style.height = `${target.scrollHeight}px`; // Set height to details
              setTitle(e.target.value);
            }}
          />

          <div className='flex justify-between items-center'>
            <label htmlFor='Details' className='text-sm'>
              Details:
            </label>
            {errors.details && (
              <span className='text-xs text-red-500'>{errors.details}</span>
            )}
          </div>
          <textarea
            className='w-full resize-none h-auto outline-none text-sm placeholder:italic'
            placeholder='Details: e.g rent.'
            value={details}
            onChange={(e) => {
              const target = e.target;
              target.style.height = 'auto'; // Reset height to recalculate
              target.style.height = `${target.scrollHeight}px`; // Set height to details
              setContent(e.target.value);
            }}
          />
        </div>
        {/*Project */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='Project' className='text-sm'>
              Project:
            </label>
            {errors.project && (
              <span className='text-xs text-red-500'>{errors.project}</span>
            )}
          </div>
          <div className='flex items-center gap-5'>
            <select
              id='project'
              value={project.name}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, name: e.target.value }))
              }
              className='text-sm select'
            >
              <option value='' disabled>
                Select a project
              </option>
              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
            <button
              type='button'
              onClick={() => setIsAddProjectModalOpen(true)}
              className='text-sm text-sky-500 dark:text-zinc-50 cursor-pointer'
            >
              Add project
            </button>
          </div>
        </div>
        {/*Priority */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='Priority' className='text-sm'>
              Priority:
            </label>
            {errors.priority && (
              <span className='text-xs text-red-500'>{errors.priority}</span>
            )}
          </div>
          <div className='flex gap-2'>
            {priorities.map((value, index) => (
              <Badge
                key={index}
                onClick={() => setPriority(value)}
                value={value}
                colorMap={{
                  High:
                    priority === 'High'
                      ? 'badgeHigh'
                      : 'unSelectedBadge unSelectedBadgeHigh',
                  Medium:
                    priority === 'Medium'
                      ? 'badgeMedium'
                      : 'unSelectedBadge unSelectedBadgeMedium',
                  Low:
                    priority === 'Low'
                      ? 'badgeLow'
                      : 'unSelectedBadge unSelectedBadgeLow',
                }}
              />
            ))}
          </div>
        </div>
        {/*Due Date */}
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <label htmlFor='DueDate' className='text-sm'>
              Due date:
            </label>
            {errors.dueDate && (
              <span className='text-xs text-red-500'>{errors.dueDate}</span>
            )}
          </div>
          <div>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder='YYYY-MM-DD'
              className='text-sm select'
            />
          </div>
        </div>
        {/*Status */}
        <div className='flex flex-col gap-1'>
          <div className='flex'>
            <label htmlFor='Status' className='text-sm'>
              Status:
            </label>
            {errors.status && (
              <span className='text-xs text-red-500'>{errors.status}</span>
            )}
          </div>
          <div className='flex gap-1'>
            {statuses.map((value, index) => (
              <Badge
                key={index}
                onClick={() => setStatus(value)}
                value={value}
                colorMap={{
                  Done:
                    status === 'Done'
                      ? 'badgeDone'
                      : 'unSelectedBadge unSelectedBadgeDone',
                  Ongoing:
                    status === 'Ongoing'
                      ? 'badgeOngoing'
                      : 'unSelectedBadge unSelectedBadgeOngoing',
                  Todo:
                    status === 'Todo'
                      ? 'badgeTodo'
                      : 'unSelectedBadge unSelectedBadgeTodo',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/*Action Buttons */}
      <div className='flex gap-3'>
        <button type='submit' className='actionButton w-full'>
          Save
        </button>
        <button
          type='button'
          onClick={() => setIsModalOpen(false)}
          className='cancelButton w-full'
        >
          Cancel
        </button>
      </div>
      {isAddProjectModalOpen && (
        <Modal
          title={'Add project'}
          isOpen={isAddProjectModalOpen}
          setIsOpen={setIsAddProjectModalOpen}
          children={
            <SingleInputModalContent
              value={''}
              setValue={(value) =>
                setProject((prev) => ({
                  ...prev,
                  name: value,
                }))
              }
              onSubmit={() => addProject(project.name)}
              setIsModalOpen={setIsAddProjectModalOpen}
            />
          }
        />
      )}
    </form>
  );
};

export default EditTaskModalContent;
