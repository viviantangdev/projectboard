import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { priorities, type PriorityType } from '../../../shared/utils/task';
import { useTasks } from '../context/useTasks';
import Badge from './Badge';

interface NewTaskModalContentProps {
  setIsModalOpen: (isOpen: boolean) => void;
}

const NewTaskModalContent = ({ setIsModalOpen }: NewTaskModalContentProps) => {
  const { onCreateTask } = useTasks();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [project, setProject] = useState<string | undefined>(undefined);
  const [priority, setPriority] = useState<PriorityType | undefined>(undefined);
  const [dueDate, setDueDate] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Reset error message
    setErrors({});

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    if (!title) newErrors.title = '* Title is required';
    if (!content) newErrors.content = '* Details is required';
    if (!project) newErrors.project = '* Project is required';
    if (!priority) newErrors.priority = '* Select priority';
    if (!dueDate) newErrors.dueDate = '* Due date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if all required fields are valid
    if (title && content && project && priority && dueDate) {
      onCreateTask({
        id: '',
        title,
        content,
        project,
        priority,
        dueDate,
        status: 'Todo',
      });
      // Reset form fields
      setTitle(undefined);
      setContent(undefined);
      setProject(undefined);
      setPriority(undefined);
      setDueDate(undefined);
      setIsModalOpen(false); // Close modal
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 py-5'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-sm'>Project:</span>
            <input
              type='text'
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className='text-sm rounded border border-sky-500 px-1'
            />
          </div>
          {errors.project && (
            <span className='text-xs text-red-500'>{errors.project}</span>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-sm'>Due date:</span>
            <input
              type='date'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder='YYYY-MM-DD'
              className='text-sm rounded border border-sky-500 px-1'
            />
          </div>
          {errors.dueDate && (
            <span className='text-xs text-red-500'>{errors.dueDate}</span>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-sm'>Priority:</span>
            <div className='flex gap-2'>
              {priorities.map((value, index) => (
                <Badge
                  key={index}
                  onClick={() => setPriority(value)}
                  value={value}
                  colorMap={{
                    High:
                      priority === 'High'
                        ? 'text-red-700 bg-red-100 border-red-100 border-2'
                        : 'text-red-700 bg-transparent border-red-100 border-2 hover:text-red-700 hover:bg-red-100 hover:border-red-100 hover:border-2',
                    Medium:
                      priority === 'Medium'
                        ? 'text-amber-700 bg-amber-100 border-amber-100 border-2'
                        : 'text-amber-700 bg-transparent border-amber-100 border-2 hover:text-amber-700 hover:bg-amber-100 hover:border-amber-100 hover:border-2',
                    Low:
                      priority === 'Low'
                        ? 'text-emerald-700 bg-emerald-100 border-emerald-100 border-2'
                        : 'text-emerald-700 bg-transparent border-emerald-100 border-2 hover:text-emerald-700 hover:bg-emerald-100 hover:border-emerald-100 hover:border-2',
                  }}
                />
              ))}
            </div>
          </div>
          {errors.priority && (
            <span className='text-xs text-red-500'>{errors.priority}</span>
          )}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <label className='text-sm'>Title</label>
          {errors.title && (
            <span className='text-xs text-red-500'>{errors.title}</span>
          )}
        </div>
        <textarea
          className='w-full resize-none h-auto outline-none text-sm'
          placeholder='Title: e.g Pay bills'
          value={title}
          onChange={(e) => {
            const target = e.target;
            target.style.height = 'auto'; // Reset height to recalculate
            target.style.height = `${target.scrollHeight}px`; // Set height to content
            setTitle(e.target.value);
          }}
        />

        <div className='flex justify-between items-center'>
          <label className='text-sm'>Details</label>
          {errors.content && (
            <span className='text-xs text-red-500'>{errors.content}</span>
          )}
        </div>
        <textarea
          className='w-full resize-none h-auto outline-none text-sm'
          placeholder='Details: e.g rent.'
          value={content}
          onChange={(e) => {
            const target = e.target;
            target.style.height = 'auto'; // Reset height to recalculate
            target.style.height = `${target.scrollHeight}px`; // Set height to content
            setContent(e.target.value);
          }}
        />
      </div>
      <div className='flex gap-3'>
        <button type='submit' className='actionButton w-full'>
          Save
        </button>
        <button type='submit' className='cancelButton w-full'>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewTaskModalContent;
