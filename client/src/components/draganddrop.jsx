import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import '../core-ui/draganddrop.css';
import FileCard from './file-card';
import {setUploadedImages} from "../actions/index";


function DragAndDrop() {
  const myState =  useSelector(state=>state.imageContainer);
  const dispatch = useDispatch();

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(myState);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(setUploadedImages(items));
  }

  const deletePhoto = (val)=>{
    console.log(myState);
  }

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters" direction='horizontal'>
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {myState.map((val, index) => {
                  return (
                    <Draggable key={val.id} draggableId={val.id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <FileCard id={val.id} src={val.file} deletePhotofn={deletePhoto}/>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}


export default DragAndDrop;