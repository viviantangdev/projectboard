import { arrayMove } from '@dnd-kit/sortable';
import { v4 as uuidV4 } from 'uuid';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';
import type { NoteItem } from '../../../shared/utils/note';
import { NotesContext } from './useNotes';

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useLocalStorage<NoteItem[]>('NOTES', [
    { id: '1', title: 'Note 1', details: 'Details 1' },
    { id: '2', title: 'Note 2', details: 'Details 2' },
    { id: '3', title: 'Note 3', details: 'Details 3' },
  ]);

  function onAddNote({ title, details }: NoteItem) {
    setNotes((prev) => [
      ...prev,
      {
        id: uuidV4(),
        title,
        details,
      },
    ]);
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
        onAddNote,
        onUpdateNote,
        onDeleteNote,
        onReorderNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
