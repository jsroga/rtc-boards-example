import { takeLatest, call, select } from 'redux-saga/effects'
import actionTypes from '../types/cards'
import { pushOps } from '../../rtc/index'
import { IState } from '../types/state'
import {
  IAddCardAction,
  IRemoveCardAction,
  IChangeCardOrderAction,
  IChangeCardParentAction,
  IChangeCardContentAction
} from '../types/cards'
import {
  shareAddCard,
  shareRemoveCard,
  shareChangeCardOrder,
  shareChangeCardParent,
  shareChangeCardContent
} from '../../rtc/cards'

function* onAddCardRequested() {
  yield takeLatest(actionTypes.ADD_CARD_REQUESTED, function*(action: IAddCardAction) {
    const ops = yield call(shareAddCard, action.payload.card)
    yield call(pushOps, ops)
  })
}

function* onRemoveCardRequested() {
  yield takeLatest(actionTypes.REMOVE_CARD_REQUESTED, function*(action: IRemoveCardAction) {
    const state: IState = yield select()
    const ops = yield call(shareRemoveCard, state.cards[action.payload.id])
    yield call(pushOps, ops)
  })
}

function* onChangeCardOrderRequested() {
  yield takeLatest(actionTypes.CHANGE_CARD_ORDER_REQUESTED, function*(action: IChangeCardOrderAction) {
    const state: IState = yield select()
    const ops = yield call(shareChangeCardOrder, state.cards[action.payload.id], action.payload.order)
    yield call(pushOps, ops)
  })
}

function* onChangeCardParentRequested() {
  yield takeLatest(actionTypes.CHANGE_CARD_PARENT_REQUESTED, function*(action: IChangeCardParentAction) {
    const state: IState = yield select()
    const ops = yield call(shareChangeCardParent, state.cards[action.payload.id], action.payload.list)
    yield call(pushOps, ops)
  })
}

function* onChangeCardContentConfirmed() {
  yield takeLatest(actionTypes.CHANGE_CARD_CONTENT_CONFIRMED, function*(action: IChangeCardContentAction) {
    const state: IState = yield select()
    const ops = yield call(shareChangeCardContent, state.cards[action.payload.id], action.payload.content)
    yield call(pushOps, ops)
  })
}

export default [
  onAddCardRequested,
  onRemoveCardRequested,
  onChangeCardOrderRequested,
  onChangeCardParentRequested,
  onChangeCardContentConfirmed
]
