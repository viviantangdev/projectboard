import type { DropResult } from '@hello-pangea/dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

interface Note {
  id: number;
  title: string;
  content: string;
}

const NoteBoard = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: 'Note 1', content: 'Content 1' },
    { id: 2, title: 'Note 2', content: 'Content 2' },
    { id: 3, title: 'Note 3', content: 'Content 3' },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newNotes = Array.from(notes);
    const [movedNote] = newNotes.splice(source.index, 1);
    newNotes.splice(destination.index, 0, movedNote);

    setNotes(newNotes);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='simple-notes'>
        {(dropProvided) => (
          <div
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
            className='p-4 space-y-4'
          >
            {notes.map((note, index) => (
              <Draggable
                key={note.id.toString()}
                draggableId={note.id.toString()}
                index={index}
              >
                {(dragProvided) => (
                  <div
                    ref={dragProvided.innerRef}
                    {...dragProvided.draggableProps}
                    {...dragProvided.dragHandleProps}
                    className='bg-white p-2 border border-gray-300 rounded shadow-sm cursor-grab'
                  >
                    <div className='flex items-start'>
                      {/* Drag Handle */}
                      <HiOutlineXMark
                        {...dragProvided.dragHandleProps}
                        className='w-5 h-5 text-gray-500 cursor-grab hover:text-gray-700'
                      />
                      <div className='ml-2'>
                        <h4 className='font-semibold'>{note.title}</h4>
                        <p className='text-sm text-gray-600'>{note.content}</p>
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NoteBoard;
