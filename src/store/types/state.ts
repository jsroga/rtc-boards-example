import { IListsState } from '../reducers/lists'
import { ICardsState } from '../reducers/cards'
import { IWorkspaceState } from '../reducers/workspace'

export interface IState {
  lists: IListsState
  cards: ICardsState
  workspace: IWorkspaceState
}
