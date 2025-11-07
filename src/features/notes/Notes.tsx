import { FaNoteSticky } from 'react-icons/fa6';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import NoteBoard from './components/NoteBoard';
import { useNotes } from './context/useNotes';

const Notes = () => {
  const { onCreateNote } = useNotes();

  function handleSumbit() {
    onCreateNote({ id: '', title: '', details: '' }); // ID will be generated in onCreateNote
  }
  return (
    <FeatureLayout
      title='Notes'
      icon={<FaNoteSticky /> }
      withCreateButton={false}
      actionButton={
        <button onClick={handleSumbit} className='actionButton'>
          + Create note
        </button>
      }
    >
      <NoteBoard />
    </FeatureLayout>
  );
};

export default Notes;
