import actionTypes, {
  ISetBpmConfirmedAction,
  ISetBpmRequestedAction,
  ISetTimeSignatureConfirmedAction,
  ISetTimeSignatureRequestedAction
} from '../types/board'

// BPM
export const setBpmRequested = (bpm: number): ISetBpmRequestedAction => ({
  type: actionTypes.SET_BPM_REQUESTED,
  payload: { bpm }
})

export const setBpmConfirmed = (bpm: number): ISetBpmConfirmedAction => ({
  type: actionTypes.SET_BPM_CONFIRMED,
  payload: { bpm }
})


// TIME_SIGNATURE
export const setTimeSignatureRequested = (timeSignature: string): ISetTimeSignatureRequestedAction => ({
  type: actionTypes.SET_TIME_SIGNATURE_REQUESTED,
  payload: { timeSignature }
})

export const setTimeSignatureConfirmed = (timeSignature: string): ISetTimeSignatureConfirmedAction => ({
  type: actionTypes.SET_TIME_SIGNATURE_CONFIRMED,
  payload: { timeSignature }
})
