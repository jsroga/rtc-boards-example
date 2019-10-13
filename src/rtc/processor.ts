import store from '../store'
import { Op } from '@soundation/sharedb/lib/client'
import { batch } from 'react-redux';
import { undoManager } from './index';
import { isAddListOp, isRemoveListOp, isChangeListOrderOp } from './ops/lists';
import { addListConfirmed, removeListConfirmed, changeListOrderConfirmed } from '../store/actions/lists';

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
      }
      if (action) {
        processActions.push(action)
        store.dispatch(action)
      }
    }

    const newUndoable = undoManager.canUndo()
    const newRedoable = undoManager.canRedo()
    // const { workspace } = store.getState()

    // if (undoable !== newUndoable) {
    //   store.dispatch(setUndoable(newUndoable))
    // }
    // if (redoable !== newRedoable) {
    //   store.dispatch(setRedoable(newRedoable))
    // }
  })
}
