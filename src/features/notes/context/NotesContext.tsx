import { createContext } from 'react';
import type { NoteItem } from '../../../shared/utils/note';

type NotesContextType = {
  notes: NoteItem[];
  onCreateNote: (data: NoteItem) => void;
  onUpdateNote: (id: string, data: NoteItem) => void;
  onDeleteNote: (id: string) => void;
  onReorderNotes: (activeId: string, overId: string) => void; // New function
};

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);
