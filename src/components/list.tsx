import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Card } from './card'
import { connect } from 'react-redux'
import { IState } from '../store/types/state'
import { ICardsState } from '../store/reducers/cards'
import { pick, sortBy } from 'lodash'
import './list.scss'

interface IListProps {
  order: number
  id: string
  cards: ICardsState
  onAddCard: (content: string, cardId: string) => void
  onRemoveCard: (id: string) => void
  onRemoveList: (id: string) => void
}

interface IListState {
  newCard: string
}

class List extends React.Component<IListProps, IListState> {
  public state = {
    newCard: ''
  }

  public handleListDelete = () => {
    this.props.onRemoveList(this.props.id)
  }

  public handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    this.props.onAddCard(this.state.newCard, this.props.id)
    this.setState({ newCard: '' })
  }

  public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newCard: e.target.value })
  }

  public handleCardRemove = (id: string) => {
    this.props.onRemoveCard(id)
  }

  public render() {
    const sortedCards = sortBy(Object.values(this.props.cards), 'order')
    return (
      <div className="rtc-list card">
        <div className="rtc-list-top">
          <div className="rtc-list-id">{this.props.id}</div>
          <a onClick={this.handleListDelete} className="delete" />
        </div>
        <Droppable droppableId={this.props.id} type="CARDS">
          {(provided) => (
            <div ref={provided.innerRef} className={`rtc-list-droppable ${!sortedCards.length ? 'dashed' : ''}`}>
              {sortedCards.map((item: any, index: number) => (
                <Card
                  content={item.content}
                  onRemove={this.handleCardRemove}
                  id={item.id}
                  index={index}
                  key={item.id}
                  order={item.order}
                ></Card>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="rtc-list-add-container">
          <form onSubmit={this.handleAddCard}>
            <div className="field has-addons">
              <div className="control rtc-list-input-container">
                <input
                  type="text"
                  onChange={this.handleInputChange}
                  value={this.state.newCard}
                  className="input"
                  placeholder="Add another card"
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: IState, ownProps: Pick<IListProps, 'id'>): Pick<IListProps, 'cards' | 'order'> => {
  const ids = Object.values(state.cards)
    .filter(({ list }) => list === ownProps.id)
    .map((list) => list.id)
  return {
    cards: pick(state.cards, ids),
    order: state.lists[ownProps.id].order
  }
}

export default connect(mapStateToProps)(List)
