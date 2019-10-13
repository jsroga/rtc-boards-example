import React from 'react';
import './App.scss';
import Board from './components/board';
import { Provider } from 'react-redux'
import store from './store/index';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Board />
    </Provider>
  );
}

export default App;
