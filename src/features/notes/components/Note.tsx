import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { HiOutlineXMark } from 'react-icons/hi2';
import { RiDraggable } from 'react-icons/ri';
import type { NoteItem } from '../../../shared/utils/note';

interface NoteProps {
  note: NoteItem;
  onDelete: () => void;
  onUpdate: (updatedData: NoteItem) => void; // Updated to accept data
  dragHandleProps?: SyntheticListenerMap | null;
}

const Note = ({ note, onDelete, onUpdate, dragHandleProps }: NoteProps) => {
  return (
    <div className='note'>
      <div className='flex justify-between items-center'>
        <div {...dragHandleProps} className='cursor-grab'>
          <RiDraggable />
        </div>
        <HiOutlineXMark onClick={onDelete} className='cursor-pointer' />
      </div>
      <textarea
        className='w-full resize-none h-auto text-md '
        placeholder='New title'
        value={note.title}
        onChange={(e) => {
          const target = e.target;
          target.style.height = 'auto'; // Reset height to recalculate
          target.style.height = `${target.scrollHeight}px`; // Set height to content
          onUpdate({
            id: note.id,
            title: e.target.value,
            content: note.content,
          });
        }}
      />

      <textarea
        className='w-full resize-none h-auto outline-none text-sm'
        placeholder='New content'
        value={note.content}
        onChange={(e) => {
          const target = e.target;
          target.style.height = 'auto'; // Reset height to recalculate
          target.style.height = `${target.scrollHeight}px`; // Set height to content
          onUpdate({
            id: note.id,
            title: note.title,
            content: e.target.value,
          });
        }}
      />
    </div>
  );
};

export default Note;
