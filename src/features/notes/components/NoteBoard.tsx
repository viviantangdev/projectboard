import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { NoteItem } from '../../../shared/utils/note';
import { useNotes } from '../context/useNotes';
import Note from './Note';

const SortableNote = ({ note }: { note: NoteItem }) => {
  const { onDeleteNote, onUpdateNote } = useNotes();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: note.id.toString(),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.75 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Note
        note={note}
        dragHandleProps={listeners}
        onDelete={() => onDeleteNote(note.id)}
        onUpdate={(updatedData: NoteItem) =>
          onUpdateNote(note.id, updatedData)
        }
      />
    </div>
  );
};

const NoteBoard = () => {
  const { notes, onReorderNotes } = useNotes();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderNotes(active.id.toString(), over.id.toString());
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={notes.map((note) => note.id.toString())}
        strategy={rectSortingStrategy}
      >
        <div className='noteBoard'>
          {notes.map((note) => (
            <SortableNote key={note.id.toString()} note={note} />
          )).reverse()}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default NoteBoard;
