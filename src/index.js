import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import App from 'components/App'
import registerServiceWorker from './registerServiceWorker'

import reducer from 'modules'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import * as firebase from 'firebase'

const isDevelopment = process.env.NODE_ENV === 'development'
const store = isDevelopment ? createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) : createStore(reducer)

const config = {

};

firebase.initializeApp(config);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
