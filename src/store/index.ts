import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'
import { IState } from './types/state';

export const initialState: IState = { 
  lists: {
    'l1' : {
      id: 'l1',
      order: 1
    },
    'l2' : {
      id: 'l2',
      order: 2
    },
    'l3' : {
      id: 'l3',
      order: 3
    }
  },
  cards: {
    'c1': {
      id: 'c1',
      order: 1,
      content: 'dupa',
      list: 'l1'
    },
    'c2': {
      id: 'c2',
      order: 2,
      content: 'dupa2',
      list: 'l1'
    },
    'c3': {
      id: 'c3',
      order: 3,
      content: 'dupa3',
      list: 'l2'
    },
    'c4': {
      id: 'c4',
      order: 4,
      content: 'dupa4',
      list: 'l2'
    },
    'c5': {
      id: 'c5',
      order: 1,
      content: 'dupa5',
      list: 'l3'
    }
  }
};

const sagaMiddleware = createSagaMiddleware({
  onError: (error: Error, { sagaStack }) => {
    console.error(error, sagaStack)
  }
})
const middlewares: any[] = [sagaMiddleware]
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(sagas)

export default store
