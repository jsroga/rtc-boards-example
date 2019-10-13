import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import List from "./list";
import { IListsState } from "../store/reducers/lists";
import { connect } from "react-redux";
import { IState } from "../store/types/state";
import "./board.scss";
import {
 addListRequested,
 removeListRequested,
 changeListOrderRequested
} from "../store/actions/lists";
import { first, sortBy, last } from "lodash";
import uuid from "uuid";
interface IBoardProps {
 lists: IListsState;
 addListRequested: typeof addListRequested;
 removeListRequested: typeof removeListRequested;
 changeListOrderRequested: typeof changeListOrderRequested;
}

class Board extends React.Component<IBoardProps> {
 onDragEnd = (result: any) => {
  const { source, destination, type, draggableId } = result;

  if (!destination) {
   return;
  }

  switch (type) {
   case "LISTS":
    return this.handleListsChange(draggableId, source.index, destination.index);
   case "CARDS":
    return this.handleCardsChange(draggableId, source.index, destination.index);
  }
 };

 handleCardsChange(
  draggableId: string,
  sourceIndex: number,
  destinationIndex: number
 ) {}

 handleListsChange(
  draggableId: string,
  sourceIndex: number,
  destinationIndex: number
 ) {
  const sortedList = this.getSortedList();
  const sourceList = sortedList[sourceIndex];
  const destinationList = sortedList[destinationIndex];
  const diff = sourceList.order - destinationList.order;

  if (diff > 0) {
   const beforeList = sortedList[destinationIndex - 1];
   const firstList = first(sortedList);
   if (beforeList) {
    const diff = beforeList.order - destinationList.order;
    const newOrder =
     destinationList.order + Math.random() * diff * 0.9 + 0.05 * diff;
    this.props.changeListOrderRequested(draggableId, newOrder);
   } else if (firstList) {
    this.props.changeListOrderRequested(draggableId, firstList.order - 1);
   }
  } else if (diff < 0) {
   const afterList = sortedList[destinationIndex + 1];
   let diff = 1;
   if (afterList) {
    diff = afterList.order - destinationList.order;
   }
   const newOrder =
    destinationList.order + Math.random() * diff * 0.9 + 0.05 * diff;
   this.props.changeListOrderRequested(draggableId, newOrder);
  }
 }

 private handleAddList = () => {
  const sortedList = this.getSortedList();
  const lastList = last(sortedList);
  this.props.addListRequested({
    id: uuid.v4(),
    order: lastList ? lastList.order + 1 : 0,
    cards: {}
   });
 };

 getSortedList() {
  return sortBy(Object.values(this.props.lists), "order");
 }

 render() {
  return (
   <div className="rtc-board">
    <DragDropContext onDragEnd={this.onDragEnd}>
     <Droppable droppableId="mainArea" direction="horizontal" type="LISTS">
      {provided => (
       <div ref={provided.innerRef} className="rtc-board-container">
        {this.getSortedList().map((list, index) => {
         return (
          <Draggable draggableId={list.id} key={list.id} index={index}>
           {dragProvided => (
            <div
             ref={dragProvided.innerRef}
             {...dragProvided.draggableProps}
             {...dragProvided.dragHandleProps}
            >
             <List id={list.id} key={list.id}></List>
            </div>
           )}
          </Draggable>
         );
        })}
        
       </div>
       
      )}
     </Droppable>
     <div className="rtc-list" onClick={this.handleAddList}>
         add list
        </div>
    </DragDropContext>
   </div>
  );
 }
}

const mapStateToProps = (state: IState): Pick<IBoardProps, "lists"> => {
 return {
  lists: state.lists
 };
};

const mapDispatchToProps = {
 addListRequested,
 removeListRequested,
 changeListOrderRequested
};

export default connect(
 mapStateToProps,
 mapDispatchToProps
)(Board);
