import { useState } from 'react';
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
import Modal from '../../../shared/components/Modal';
import DeleteItem from '../../../shared/components/DeleteItem';

const SortableNote = ({
  note,
  onRequestDelete,
}: {
  note: NoteItem;
  onRequestDelete: (id: string, title?: string) => void;
}) => {
  const { onUpdateNote } = useNotes();
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
        onDelete={() => onRequestDelete(note.id, note.title)}
        onUpdate={(updatedData: NoteItem) =>
          onUpdateNote(note.id, updatedData)
        }
      />
    </div>
  );
};

const NoteBoard = () => {
  const { notes, onReorderNotes, onDeleteNote } = useNotes();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteValue, setDeleteValue] = useState<string>('');

  const requestDelete = (id: string, title?: string) => {
    setDeleteId(id);
    setDeleteValue(title || '');
  };

  const handleCancelDelete = () => setDeleteId(null);

  const handleConfirmDelete = () => {
    if (deleteId) {
      onDeleteNote(deleteId);
      setDeleteId(null);
      setDeleteValue('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onReorderNotes(active.id.toString(), over.id.toString());
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={notes.map((note) => note.id.toString())}
          strategy={rectSortingStrategy}
        >
          <div className='noteBoard'>
            {notes.map((note) => (
              <SortableNote
                key={note.id.toString()}
                note={note}
                onRequestDelete={requestDelete}
              />
            )).reverse()}
          </div>
        </SortableContext>
      </DndContext>

      {/* Delete confirmation modal */}
      {deleteId && (
        <Modal
          isOpen={deleteId !== null}
          setIsOpen={handleCancelDelete}
          title={'Delete note'}
          children={
            <DeleteItem
              deleteValue={deleteValue}
              onCancel={handleCancelDelete}
              onDelete={handleConfirmDelete}
            />
          }
        />
      )}
    </>
  );
};

export default NoteBoard;
