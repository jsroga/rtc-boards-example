import { Action } from 'redux'

export default interface ActionWithPayload extends Action<string> {
  payload: any
}

export const isActionWithPayload = (action: Action): action is ActionWithPayload => {
  return !!(action as any).payload
}
