import React from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => { }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId='one'>
          {(magic) =>
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId='first' index={0}>
                {(provided) => <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >One</li>}
              </Draggable>
              <Draggable draggableId='seound' index={1}>
                {(provided) => <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >Two</li>}
              </Draggable>
            </ul>}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
