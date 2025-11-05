import FeatureLayout from '../../shared/layouts/FeatureLayout';
import NoteBoard from './components/NoteBoard';
import { useNotes } from './context/useNotes';

const Notes = () => {
  const { onCreateNote } = useNotes();

  function handleSumbit() {
    onCreateNote({ id: '', title: '', content: '' }); // ID will be generated in onCreateNote
  }
  return (
    <FeatureLayout
      title='Notes'
      actionButton={
        <button onClick={handleSumbit} className='actionButton'>
          + New note
        </button>
      }
    >
      <NoteBoard />
    </FeatureLayout>
  );
};

export default Notes;
