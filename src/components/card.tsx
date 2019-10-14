import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import './card.scss'

interface ICardProps {
  id: string
  index: number
  content: string
  order: number
  onRemove: (id: string) => void
}

export class Card extends React.Component<ICardProps> {
  public render() {
    return (
      <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.index}>
        {(provided) => (
          <div
            className="rtc-card card"
            ref={provided.innerRef}
            style={provided.draggableProps.style}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="rtc-card-top">
              <div className="rtc-card-order">{this.props.order}</div>
              <a className="rtc-card-delete delete" onClick={() => this.props.onRemove(this.props.id)} />
            </div>
            <div className="rtc-card-content">{this.props.content || 'No content'}</div>
          </div>
        )}
      </Draggable>
    )
  }
}
