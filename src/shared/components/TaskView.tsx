import type { TaskItem } from '../utils/task';
import Badge from './Badge';

interface TaskViewProps {
  task?: TaskItem; // Optional for edit mode
}

const TaskView = ({ task }: TaskViewProps) => {
  return (
    <div className='flex flex-col gap-5 py-5'>
      <div>
        <h2>{task?.title}</h2>
        <p>{task?.details}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-2'>
          <span>Project:</span>
          <p>{task?.project.name}</p>
        </div>
        <div className='flex items-center gap-2'>
          <span>Priority:</span>
          <Badge
            value={task!.priority}
            colorMap={{
              High: 'badgeHigh',
              Medium: 'badgeMedium',
              Low: 'badgeLow',
            }}
          />
        </div>
        <div className='flex items-center gap-2'>
          <span>Die date:</span>
          <p>{task?.dueDate}</p>
        </div>
        <div className='flex items-center gap-2'>
          <span>Status:</span>
          <Badge
            value={task!.status}
            colorMap={{
              Done: 'badgeDone',
              Ongoing: 'badgeOngoing',
              Todo: 'badgeTodo',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskView;
