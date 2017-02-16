import 'babel-polyfill';
import 'styles/all.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from 'components/App';
import rootReducer from 'reducers/rootReducer';
import { createLocalStore } from 'lib/localStore';
import { fromJS } from 'immutable';

const localStore = createLocalStore({
  deserialize: fromJS,
  key: 'freelance-tax-calculator'
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(applyMiddleware(localStore.middleware()));

const store = localStore.hasStoredState() ?
    createStore(rootReducer, localStore.storedState(), storeEnhancer) :
    createStore(rootReducer, storeEnhancer);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'));
