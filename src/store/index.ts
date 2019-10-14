import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error, { sagaStack }) => {
    console.error(error, sagaStack)
  }
})

const middlewares: any[] = [sagaMiddleware]
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, undefined, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(sagas)

export default store
