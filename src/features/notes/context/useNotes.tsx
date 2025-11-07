import { createContext, useContext } from 'react';
import type { NoteItem } from '../../../shared/utils/note';

type NotesContextType = {
  notes: NoteItem[];
  onCreateNote: (data: NoteItem) => void;
  onUpdateNote: (id: string, data: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onReorderNotes: (activeId: string, overId: string) => void; // New function
};

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
