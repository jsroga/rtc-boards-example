import { IListsState } from '../reducers/lists';
import { ICardsState } from '../reducers/cards';

export interface IState {
  lists: IListsState,
  cards: ICardsState
}