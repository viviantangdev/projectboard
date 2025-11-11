import { FaXmark } from 'react-icons/fa6';

interface TagProps {
  name: string;
  onClick: () => void;
}

const Tag = ({ name, onClick }: TagProps) => {
  return (
    <button type='button' onClick={onClick} className='tag'>
      {name} <FaXmark />
    </button>
  );
};

export default Tag;
