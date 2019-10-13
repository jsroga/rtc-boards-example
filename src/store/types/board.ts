import ActionWithPayload from './actionWithPayload'
import { Action } from 'redux'

enum actionTypes {
  SET_BPM_REQUESTED = 'ARRANGEMENT_SET_BPM_REQUESTED',
  SET_BPM_CONFIRMED = 'ARRANGEMENT_SET_BPM_CONFIRMED',

  SET_TIME_SIGNATURE_REQUESTED = 'ARRANGEMENT_SET_TIME_SIGNATURE_REQUESTED',
  SET_TIME_SIGNATURE_CONFIRMED = 'ARRANGEMENT_SET_TIME_SIGNATURE_CONFIRMED',
}

export default actionTypes

// BPM
export interface ISetBpmRequestedAction extends ActionWithPayload {
  type: actionTypes.SET_BPM_REQUESTED
  payload: {
    bpm: number
  }
}
export const isSetBpmRequestedAction = (action: Action): action is ISetBpmRequestedAction =>
  action.type === actionTypes.SET_BPM_REQUESTED

export interface ISetBpmConfirmedAction extends ActionWithPayload {
  type: actionTypes.SET_BPM_CONFIRMED
  payload: {
    bpm: number
  }
}
export const isSetBpmConfirmedAction = (action: Action): action is ISetBpmConfirmedAction =>
  action.type === actionTypes.SET_BPM_CONFIRMED

// TIME SIGNATURE
export interface ISetTimeSignatureRequestedAction extends ActionWithPayload {
  type: actionTypes.SET_TIME_SIGNATURE_REQUESTED
  payload: {
    timeSignature: string
  }
}
export const isSetTimeSignatureRequestedAction = (action: Action): action is ISetTimeSignatureRequestedAction =>
  action.type === actionTypes.SET_TIME_SIGNATURE_REQUESTED

export interface ISetTimeSignatureConfirmedAction extends ActionWithPayload {
  type: actionTypes.SET_TIME_SIGNATURE_CONFIRMED
  payload: {
    timeSignature: string
  }
}
export const isSetTimeSignatureConfirmedAction = (action: Action): action is ISetTimeSignatureConfirmedAction =>
  action.type === actionTypes.SET_TIME_SIGNATURE_CONFIRMED
