import {
  priorities,
  statuses,
  type PriorityType,
  type StatusType,
} from '../../../shared/utils/task';
import Badge from './Badge';

interface TaskProps {
  title: string;
  setTitle: (changed: string) => void;
  content: string;
  setContent: (changed: string) => void;
  project: string;
  setProject: (changed: string) => void;
  priority: PriorityType;
  setPriority: (changed: PriorityType) => void;
  dueDate: string;
  setDueDate: (changed: string) => void;
  status?: StatusType;
  setStatus?: (change: StatusType) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleCancel: () => void;
  errors: { [key: string]: string };
}
const TaskForm = ({
  title,
  setTitle,
  content,
  setContent,
  project,
  setProject,
  priority,
  setPriority,
  dueDate,
  setDueDate,
  status,
  setStatus,
  errors,
  handleSubmit,
  handleCancel,
}: TaskProps) => {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-10 py-5'>
      <div className='flex flex-col gap-3'>
        {/*Title & Details */}
        <div>
          <div className='flex justify-between items-center'>
            <label htmlFor='title' className='text-sm'>
              Title
            </label>
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
            <label htmlFor='Details' className='text-sm'>
              Details
            </label>
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
        {/*Project */}
        <div className='flex items-center justify-between'>
          <div>
            <label htmlFor='Project' className='text-sm'>
              Project:
            </label>
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
        {/*Priority */}
        <div className='flex items-center justify-between'>
          <div className='flex'>
            <label htmlFor='Priority' className='text-sm'>
              Priority:
            </label>
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
        {/*Due Date */}
        <div className='flex items-center justify-between'>
          <div>
            <label htmlFor='DueDate' className='text-sm'>
              Due date:
            </label>
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
        {/*Status */}
        {status && setStatus && (
          <div className='flex items-center justify-between'>
            <div className='flex'>
              <label htmlFor='Status' className='text-sm'>
                Status:
              </label>
              <div className='flex gap-2'>
                {statuses.map((value, index) => (
                  <Badge
                    key={index}
                    onClick={() => setStatus(value)}
                    value={value}
                    colorMap={{
                      Done:
                        status === 'Done'
                          ? 'text-emerald-700 bg-emerald-100 border-emerald-100 border-2'
                          : 'text-emerald-700 bg-transparent border-emerald-100 border-2 hover:text-emerald-700 hover:bg-emerald-100 hover:border-emerald-100 hover:border-2',
                      Todo:
                        status === 'Todo'
                          ? 'text-zinc-700 bg-sky-100 border-sky-100 border-2'
                          : 'text-zinc-700 bg-transparent border-zinc-100 border-2 hover:text-zinc-700 hover:bg-sky-100 hover:border-sky-100 hover:border-2',
                    }}
                  />
                ))}
              </div>
            </div>
            {errors.status && (
              <span className='text-xs text-red-500'>{errors.status}</span>
            )}
          </div>
        )}
      </div>

      {/*Action Buttons */}
      <div className='flex gap-3'>
        <button type='submit' className='actionButton w-full'>
          Save
        </button>
        <button
          type='button'
          onClick={handleCancel}
          className='cancelButton w-full'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
