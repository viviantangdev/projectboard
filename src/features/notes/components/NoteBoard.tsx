import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import type { NoteItem } from '../../../shared/utils/note';
import Note from './Note';

const SortableNote = ({ note }: { note: NoteItem }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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
        title={note.title}
        content={note.content}
        id={note.id}
        dragHandleProps={listeners}
        // onDelete={() => handleDelete(note.id)}
      />
    </div>
  );
};

const NoteBoard = () => {
  const [notes, setNotes] = useState<NoteItem[]>([
    { id: 1, title: 'Note 1', content: 'Content 1' },
    { id: 2, title: 'Note 2', content: 'Content 2 with more text to test variable height. This note should be taller.' },
    { id: 3, title: 'Note 3', content: 'Content 3' },
    { id: 4, title: 'Note 3', content: 'Content 3' },
    { id: 5, title: 'Note 3', content: 'Content 3' },
    { id: 6, title: 'Note 3', content: 'Content 3' },
    { id: 7, title: 'Note 3', content: 'Content 3' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setNotes((items) => {
        const oldIndex = items.findIndex((item) => item.id.toString() === active.id);
        const newIndex = items.findIndex((item) => item.id.toString() === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // const handleDelete = (id: number) => {
  //   setNotes((items) => items.filter((note) => note.id !== id));
  // };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={notes.map((note) => note.id.toString())}
        strategy={rectSortingStrategy} // Use rectSortingStrategy for both layouts
      >
        <div className='noteBoard'>
          {notes.map((note) => (
            <SortableNote key={note.id.toString()} note={note} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default NoteBoard;