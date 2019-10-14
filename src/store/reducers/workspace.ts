import actionTypes from '../types/workspace'

export interface IWorkspaceState {
  canUndo: boolean
  canRedo: boolean
}

export default (state: IWorkspaceState | undefined, action: any): IWorkspaceState => {
  if (!state) {
    return {
      canUndo: false,
      canRedo: false
    }
  }

  const { payload, type } = action

  switch (type) {
    case actionTypes.SET_UNDOABLE:
      return {
        ...state,
        canUndo: payload
      }
    case actionTypes.SET_REDOABLE:
      return {
        ...state,
        canRedo: payload
      }
    default:
      return state
  }
}
