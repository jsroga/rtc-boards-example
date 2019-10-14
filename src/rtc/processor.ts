import store from '../store'
import { Op } from '@soundation/sharedb/lib/client'
import { batch } from 'react-redux'
import { undoManager } from './index'
import { isAddListOp, isRemoveListOp, isChangeListOrderOp } from './types/lists'
import { setUndoable, setRedoable } from '../store/actions/workspace'
import { addListConfirmed, removeListConfirmed, changeListOrderConfirmed } from '../store/actions/lists'
import {
  isAddCardOp,
  isRemoveCardOp,
  isChangeCardOrderOp,
  isChangeCardParentOp,
  isChangeCardContentOp
} from './types/cards'
import {
  addCardConfirmed,
  removeCardConfirmed,
  changeCardOrderConfirmed,
  changeCardParentConfirmed,
  ehangeCardContentConfirmed
} from '../store/actions/cards'

export const handleOps = (ops: Op[], source: boolean = false): void => {
  const processActions = []

  batch(() => {
    for (const op of ops) {
      let action

      if (isAddListOp(op)) {
        action = addListConfirmed(op.oi)
      } else if (isRemoveListOp(op)) {
        action = removeListConfirmed(op.od.id)
      } else if (isChangeListOrderOp(op)) {
        action = changeListOrderConfirmed(op.p[1], op.oi)
      } else if (isAddCardOp(op)) {
        action = addCardConfirmed(op.oi)
      } else if (isRemoveCardOp(op)) {
        action = removeCardConfirmed(op.od.id)
      } else if (isChangeCardOrderOp(op)) {
        action = changeCardOrderConfirmed(op.p[1], op.oi)
      } else if (isChangeCardParentOp(op)) {
        action = changeCardParentConfirmed(op.p[1], op.oi)
      } else if (isChangeCardContentOp(op)) {
        action = ehangeCardContentConfirmed(op.p[1], op.oi)
      }

      if (action) {
        processActions.push(action)
        store.dispatch(action)
      }
    }

    const newUndoable = undoManager.canUndo()
    const newRedoable = undoManager.canRedo()
    const { workspace } = store.getState()

    if (workspace.canUndo !== newUndoable) {
      store.dispatch(setUndoable(newUndoable))
    }
    if (workspace.canRedo !== newRedoable) {
      store.dispatch(setRedoable(newRedoable))
    }
  })
}
