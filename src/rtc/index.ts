import ShareDB, { Op } from '@soundation/sharedb/lib/client'
import { handleOps } from './processor'
import { IState } from '../store/types/state'
import store from '../store/index'
import { addCardConfirmed } from '../store/actions/cards'
import { addListConfirmed } from '../store/actions/lists'

const socket = new WebSocket('ws://rtc-example-board-server-sigma.herokuapp.com/')
const connection = new ShareDB.Connection(socket)

const doc = connection.get('project', '0')

doc.subscribe(() => {
  const state: IState = (connection as any).collections.project[0].data
  for (const card of Object.values(state.cards)) {
    store.dispatch(addCardConfirmed(card))
  }

  for (const list of Object.values(state.lists)) {
    store.dispatch(addListConfirmed(list))
  }
})

doc.on('op', (ops: Op[], source: boolean): void => {
  handleOps(ops, source)
})

export const undoManager = connection.createUndoManager({
  source: true,
  limit: 30,
  composeInterval: 100
})

export const pushOps = (ops: Op[], undoable = true) => {
  doc.submitOp(ops, {
    source: true,
    undoable
  })
}
