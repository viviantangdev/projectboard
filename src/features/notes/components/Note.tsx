import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { HiOutlineXMark } from 'react-icons/hi2';
import { RiDraggable } from 'react-icons/ri';
import type { NoteItem } from '../../../shared/utils/note';

interface NoteProps extends NoteItem {
  dragHandleProps?: SyntheticListenerMap | null;
}

const Note = ({ title, content, dragHandleProps }: NoteProps) => {
  return (
    <div className='note'>
      <div className='flex justify-between items-center'>
        <div {...dragHandleProps} className='cursor-grab'>
          <RiDraggable />
        </div>
        <HiOutlineXMark className='cursor-pointer' />
      </div>
      <span>{title}</span>
      <div>
        <span className='text-sm'>{content}</span>
      </div>
    </div>
  );
};

export default Note;
