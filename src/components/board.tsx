import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import List from './list'
import { IListsState } from '../store/reducers/lists'
import { connect } from 'react-redux'
import { IState } from '../store/types/state'
import './board.scss'
import { addListRequested, removeListRequested, changeListOrderRequested } from '../store/actions/lists'
import { first, sortBy, last } from 'lodash'
import uuid from 'uuid'
import {
  addCardRequested,
  removeCardRequested,
  changeCardOrderRequested,
  changeCardParentRequested,
  ehangeCardContentRequested
} from '../store/actions/cards'
import { ICardsState } from '../store/reducers/cards'
import { undoRequested, redoRequested } from '../store/actions/workspace'
interface IBoardProps {
  lists: IListsState
  cards: ICardsState
  addListRequested: typeof addListRequested
  removeListRequested: typeof removeListRequested
  changeListOrderRequested: typeof changeListOrderRequested
  addCardRequested: typeof addCardRequested
  removeCardRequested: typeof removeCardRequested
  changeCardOrderRequested: typeof changeCardOrderRequested
  changeCardParentRequested: typeof changeCardParentRequested
  ehangeCardContentRequested: typeof ehangeCardContentRequested
  undoRequested: typeof undoRequested
  redoRequested: typeof redoRequested
  canRedo: boolean
  canUndo: boolean
}

class Board extends React.Component<IBoardProps> {
  public onDragEnd = (result: any) => {
    const { source, destination, type, draggableId } = result

    if (!destination) {
      return
    }

    switch (type) {
      case 'LISTS':
        return this.handleListsChange(draggableId, source.index, destination.index)
      case 'CARDS':
        return this.handleCardsChange(draggableId, destination.droppableId, source.index, destination.index)
    }
  }

  public handleCardsChange(
    draggableId: string,
    destinationListId: string,
    sourceIndex: number,
    destinationIndex: number
  ) {
    const sortedCards = this.getSortedCardByListId(this.props.cards[draggableId].list)
    const destinationCards = this.getSortedCardByListId(destinationListId)
    const destinationCard = destinationCards[destinationIndex]
    const sourceCard = sortedCards[sourceIndex]
    const beforeDestinationCard = destinationCards[destinationIndex - 1]
    const afterDestinationCard =
      destinationCards[destinationListId === sourceCard.list ? destinationIndex + 1 : destinationIndex]
    const lastCard = destinationCards[destinationCards.length - 1]
    const firstCard = destinationCards[0]
    const beforeDestinationCardOrder = beforeDestinationCard
      ? beforeDestinationCard.order
      : firstCard
      ? firstCard.order - 1
      : 0
    const afterDestinationCardOrder = afterDestinationCard
      ? afterDestinationCard.order
      : lastCard
      ? lastCard.order + 1
      : 1
    const diff = sourceCard.order - afterDestinationCardOrder

    if (destinationListId !== sourceCard.list) {
      const newOrder = (afterDestinationCardOrder + beforeDestinationCardOrder) / 2
      this.props.changeCardOrderRequested(draggableId, newOrder)
      this.props.changeCardParentRequested(sourceCard.id, destinationListId)
    } else {
      const destinationOrder = destinationCard ? destinationCard.order : lastCard ? lastCard.order : 1
      const newOrder = (destinationOrder + (diff < 0 ? afterDestinationCardOrder : beforeDestinationCardOrder)) / 2
      this.props.changeCardOrderRequested(draggableId, newOrder)
    }
  }

  public getSortedCardByListId(id: string) {
    return sortBy(Object.values(this.props.cards).filter(({ list }) => list === id), 'order')
  }

  public handleListsChange(draggableId: string, sourceIndex: number, destinationIndex: number) {
    const sortedList = this.getSortedList()
    const sourceList = sortedList[sourceIndex]
    const destinationList = sortedList[destinationIndex]
    const diff = sourceList.order - destinationList.order

    if (diff >= 0) {
      const beforeList = sortedList[destinationIndex - 1]
      const firstList = first(sortedList)
      if (beforeList) {
        const diff = beforeList.order - destinationList.order
        const newOrder = destinationList.order + Math.random() * diff * 0.9 + 0.05 * diff
        this.props.changeListOrderRequested(draggableId, newOrder)
      } else if (firstList) {
        this.props.changeListOrderRequested(draggableId, firstList.order - 1)
      }
    } else if (diff < 0) {
      const afterList = sortedList[destinationIndex + 1]
      let diff = 1
      if (afterList) {
        diff = afterList.order - destinationList.order
      }
      const newOrder = destinationList.order + Math.random() * diff * 0.9 + 0.05 * diff
      this.props.changeListOrderRequested(draggableId, newOrder)
    }
  }

  public getSortedList() {
    return sortBy(Object.values(this.props.lists), 'order')
  }

  public handleAddCard = (content: string, listId: string) => {
    const lastCardInList = last(this.getSortedCardByListId(listId))
    this.props.addCardRequested({
      id: uuid.v4(),
      content,
      order: lastCardInList ? +lastCardInList.order + 1 : 0,
      list: listId
    })
  }

  public handleRemoveCard = (id: string) => {
    this.props.removeCardRequested(id)
  }

  public handleRemoveList = (id: string) => {
    this.props.removeListRequested(id)
  }

  public handleUndo = () => {
    this.props.undoRequested()
  }

  public handleRedo = () => {
    this.props.redoRequested()
  }

  public render() {
    return (
      <div className="rtc-board">
        <div className="rtc-board-actions">
          <button className="button is-primary" onClick={this.handleAddList}>
            add list
          </button>
          <button className="button is-primary" onClick={this.handleUndo} disabled={!this.props.canUndo}>
            undo
          </button>
          <button className="button is-primary" onClick={this.handleRedo} disabled={!this.props.canRedo}>
            redo
          </button>
          <button className="button is-primary" onClick={this.handleAddList}>
            print sharedb state
          </button>
          <button className="button is-primary" onClick={this.handleAddList}>
            print redux state
          </button>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="mainArea" direction="horizontal" type="LISTS">
            {(provided) => (
              <div ref={provided.innerRef} className="rtc-board-container">
                {this.getSortedList().map((list, index) => {
                  return (
                    <Draggable draggableId={list.id} key={list.id} index={index}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <List
                            onAddCard={this.handleAddCard}
                            onRemoveCard={this.handleRemoveCard}
                            onRemoveList={this.handleRemoveList}
                            id={list.id}
                            key={list.id}
                          ></List>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }

  private handleAddList = () => {
    const sortedList = this.getSortedList()
    const lastList = last(sortedList)
    this.props.addListRequested({
      id: uuid.v4(),
      order: lastList ? lastList.order + 1 : 0,
      cards: {}
    })
  }
}

const mapStateToProps = (state: IState): Pick<IBoardProps, 'lists' | 'cards' | 'canUndo' | 'canRedo'> => {
  return {
    cards: state.cards,
    lists: state.lists,
    canUndo: state.workspace.canUndo,
    canRedo: state.workspace.canRedo
  }
}

const mapDispatchToProps = {
  addListRequested,
  removeListRequested,
  changeListOrderRequested,
  addCardRequested,
  removeCardRequested,
  changeCardOrderRequested,
  changeCardParentRequested,
  ehangeCardContentRequested,
  undoRequested,
  redoRequested
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
