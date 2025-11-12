import { FaNoteSticky } from 'react-icons/fa6';
import FeatureLayout from '../../shared/layouts/FeatureLayout';
import NoteBoard from './components/NoteBoard';
import { useNotes } from './context/useNotes';

const Notes = () => {
  const { onAddNote, notes } = useNotes();

  function handleCreateNote() {
    onAddNote({ id: '', title: '', details: '' }); // ID will be generated in onCreateNote
  }
  return (
    <FeatureLayout
      title='Notes'
      icon={<FaNoteSticky />}
      withCreateButton={false}
      actionButton={
        <button onClick={handleCreateNote} className='actionButton'>
          + Create note
        </button>
      }
    >
      {notes.length === 0 ? (
        <div className='flex flex-col items-baseline gap-2'>
          <p>No notes here yet!</p>
          <p>Add a note to get started.</p>
          <button type='button' onClick={handleCreateNote} className='actionButton'>
            Create note
          </button>
        </div>
      ) : (
        <NoteBoard />
      )}
    </FeatureLayout>
  );
};

export default Notes;
