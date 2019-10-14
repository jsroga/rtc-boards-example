import { all, call, spawn } from 'redux-saga/effects'
import lists from './lists'
import cards from './cards'
import workspace from './workspace'

export default function* rootSaga() {
  const sagas: any = [...lists, ...cards, ...workspace]

  yield all(
    sagas.map((saga: any) => {
      return spawn(function*() {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.error(e)
          }
        }
      })
    })
  )
}
