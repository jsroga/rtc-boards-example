import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface ICardProps {
  id: string,
  index: number,
  content: string 
}

export class Card extends React.Component<ICardProps> {
  render() {
    return (
      <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
         <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
         >
          {this.props.content}
         </div>
        )}
       </Draggable>
    )
  }
}