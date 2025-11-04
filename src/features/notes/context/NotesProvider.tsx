import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import type { NoteItem } from '../../../shared/utils/note';
import { NotesContext } from './NotesContext';

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useLocalStorage<NoteItem[]>('NOTES', [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' },
    { id: '3', title: 'Note 3', content: 'Content 3' },

  ]);

  function onCreateNote({ ...data }: NoteItem) {
    setNotes((prev) => [...prev, { ...data, id: uuidV4() }]);
  }

  function onUpdateNote(id: string, { ...data }: NoteItem) {
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...data } : note))
    );
  }

  function onDeleteNote(id: string) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function onReorderNotes(activeId: string, overId: string) {
    setNotes((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === activeId);
      const newIndex = prev.findIndex((item) => item.id === overId);
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        onCreateNote,
        onUpdateNote,
        onDeleteNote,
        onReorderNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
