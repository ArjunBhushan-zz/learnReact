import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultsReducer from './store/reducers/results';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log(`[Middleware]: Dispatching ${JSON.stringify(action, null, 2)}`);
      const result = next(action);
      console.log(`[Middleware]: next state ${JSON.stringify(store.getState(), null,2)}`)
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  counter: counterReducer,
  results: resultsReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store = {store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
