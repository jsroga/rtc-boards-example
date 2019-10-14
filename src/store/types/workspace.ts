import ActionWithPayload from './actionWithPayload'
import { Action } from 'redux'

enum actionTypes {
  UNDO_REQUESTED = 'RTC_WORKSPACE_UNDO_REQUESTED',
  REDO_REQUESTED = 'RTC_WORKSPACE_REDO_REQUESTED',
  SET_UNDOABLE = 'RTC_WORKSPACE_SET_UNDOABLE',
  SET_REDOABLE = 'RTC_WORKSPACE_SET_REDOABLE'
}

export default actionTypes

export interface IUndoRequested extends Action {
  type: actionTypes.UNDO_REQUESTED
}

export interface IRedoRequested extends Action {
  type: actionTypes.REDO_REQUESTED
}

export interface ISetUndoable extends ActionWithPayload {
  type: actionTypes.SET_UNDOABLE
  payload: boolean
}

export interface ISetRedoable extends ActionWithPayload {
  type: actionTypes.SET_REDOABLE
  payload: boolean
}
