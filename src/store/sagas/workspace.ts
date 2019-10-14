import { takeLatest } from 'redux-saga/effects'
import { undoManager } from '../../rtc/index'
import actionTypes from '../types/workspace'

function* onUndoRequested() {
  yield takeLatest(actionTypes.UNDO_REQUESTED, function*() {
    undoManager.undo({ source: true })
  })
}

function* onRedoRequested() {
  yield takeLatest(actionTypes.REDO_REQUESTED, function*() {
    undoManager.redo({ source: true })
  })
}

export default [onUndoRequested, onRedoRequested]
