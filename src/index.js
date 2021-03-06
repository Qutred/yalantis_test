import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { saveToLocalStorage } from './utils/localStorageAPI';

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
