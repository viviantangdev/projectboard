import { HiOutlineXMark } from 'react-icons/hi2';
import { RiDraggable } from 'react-icons/ri';

interface NoteProps {
  title: string;
  content: string;
}

const Note = ({ title, content }: NoteProps) => {
  return (
    <div className='note'>
      <div className='flex justify-between items-center'>
        <RiDraggable className='cursor-grab' />
        <HiOutlineXMark className='cursor-pointer'/>
      </div>
      <span>{title}</span>
      <div className=''>
        <span className='text-sm'>{content}</span>
      </div>
    </div>
  );
};

export default Note;
