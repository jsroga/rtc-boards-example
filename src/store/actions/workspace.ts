import actionTypes from '../types/workspace'
import { IUndoRequested, IRedoRequested, ISetUndoable, ISetRedoable } from '../types/workspace'

export const undoRequested = (): IUndoRequested => {
  return {
    type: actionTypes.UNDO_REQUESTED
  }
}

export const redoRequested = (): IRedoRequested => {
  return {
    type: actionTypes.REDO_REQUESTED
  }
}

export const setUndoable = (value: boolean): ISetUndoable => {
  return {
    type: actionTypes.SET_UNDOABLE,
    payload: value
  }
}

export const setRedoable = (value: boolean): ISetRedoable => {
  return {
    type: actionTypes.SET_REDOABLE,
    payload: value
  }
}
