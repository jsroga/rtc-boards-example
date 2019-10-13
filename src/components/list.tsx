import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "./card";
import { connect } from "react-redux";
import { IState } from "../store/types/state";
import { ICardsState } from "../store/reducers/cards";
import { pick } from "lodash";

interface IListProps {
 order: number;
 id: string;
 cards: ICardsState;
}

class List extends React.Component<IListProps> {
 render() {
  const sortedCards = Object.values(this.props.cards).sort(card => card.order);
  return (
   <Droppable droppableId="droppable">
    {provided => (
     <div ref={provided.innerRef}>
      {sortedCards.map((item: any, index: number) => (
       <Card content={item.content} id={item.id} index={index}></Card>
      ))}
      {provided.placeholder}
     </div>
    )}
   </Droppable>
  );
 }
}

const mapStateToProps = (
 state: IState,
 ownProps: Pick<IListProps, "id">
): Pick<IListProps, "cards" | "order"> => {
 const ids = Object.values(state.cards)
  .filter(({ list }) => list === ownProps.id)
  .map(list => list.id);
 return {
  cards: pick(state.cards, ids),
  order: state.lists[ownProps.id].order
 };
};

export default connect(mapStateToProps)(List);
