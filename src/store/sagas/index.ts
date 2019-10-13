import { all, call, spawn } from 'redux-saga/effects'
import lists from './lists'

export default function* rootSaga() {
  const sagas: any = [
    ...lists
  ]

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
