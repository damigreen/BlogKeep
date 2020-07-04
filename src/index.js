import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import 'antd/dist/antd.css';

const rootEl = document.getElementById('root');

let render = () => {
  const App = require('./App').default;
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootEl
  );
}


if (module.hot) {
  module.hot.accept('./App', () => {
    setTimeout(render)
  });
}


render();
