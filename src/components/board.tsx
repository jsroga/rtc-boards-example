import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import List from "./list";
import { IListsState } from "../store/reducers/lists";
import { connect } from "react-redux";
import { IState } from "../store/types/state";

interface IBoardProps {
 lists: IListsState;
}

// a little function to help us with reordering the result
const reorder = (list: any[], startIndex: number, endIndex: number) => {
 const result = Array.from(list);
 const [removed] = result.splice(startIndex, 1);
 result.splice(endIndex, 0, removed);

 return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
 source: any[],
 destination: any[],
 droppableSource: any,
 droppableDestination: any
): { [id: string]: any } => {
 const sourceClone = Array.from(source);
 const destClone = Array.from(destination);
 const [removed] = sourceClone.splice(droppableSource.index, 1);

 destClone.splice(droppableDestination.index, 0, removed);

 const result: { [id: string]: any } = {};
 result[droppableSource.droppableId] = sourceClone;
 result[droppableDestination.droppableId] = destClone;

 return result;
};

class Board extends React.Component<IBoardProps> {
 onDragEnd = (result: any) => {
  const { source, destination } = result;

  if (!destination) {
   return;
  }
 };

 render() {
  const sortedList = Object.values(this.props.lists).sort(item => item.order);

  return (
   <DragDropContext onDragEnd={this.onDragEnd}>
    {sortedList.map(list => (
     <List id={list.id} key={list.id}></List>
    ))}
   </DragDropContext>
  );
 }
}

const mapStateToProps = (state: IState): Pick<IBoardProps, "lists"> => {
 return {
  lists: state.lists
 };
};

export default connect(mapStateToProps)(Board);
