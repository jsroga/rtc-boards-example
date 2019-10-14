import { takeLatest, call, select, put } from 'redux-saga/effects';
import actionTypes from '../types/lists';
import { IAddListAction, IRemoveListAction, IChangeListOrderAction } from '../types/lists';
import { shareAddList, shareRemoveList, shareChangeListOrder } from '../../rtc/lists';
import { pushOps } from '../../rtc/index';
import { IState } from '../types/state';
import { removeCardRequested } from '../actions/cards';

function* onAddListRequested() {
  yield takeLatest(actionTypes.ADD_LIST_REQUESTED, function*(action: IAddListAction) {
    const ops = yield call(shareAddList, action.payload)
    yield call(pushOps, ops)
  })
}

function* onRemoveListRequested() {
  yield takeLatest(actionTypes.REMOVE_LIST_REQUESTED, function*(action: IRemoveListAction) {
    const state: IState = yield select()
    const ops = yield call(shareRemoveList, state.lists[action.payload.id])
    const cardIds = Object.values(state.cards).filter(({list}) => list === action.payload.id).map(({id}) => id)

    for (const cardId of cardIds) {
      yield put(removeCardRequested(cardId))
    }
    
    yield call(pushOps, ops)
  })
}

function* onChangeListOrderRequested() {
  yield takeLatest(actionTypes.CHANGE_LIST_ORDER_REQUESTED, function*(action: IChangeListOrderAction) {
    const state: IState = yield select()
    const ops = yield call(shareChangeListOrder, state.lists[action.payload.id], action.payload.order)
    yield call(pushOps, ops)
  })
}

export default [
  onAddListRequested,
  onRemoveListRequested,
  onChangeListOrderRequested
]
