import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import Layout from './components/Layout/Layout'
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


function App() {
  return (
    <Provider store = {store}>
      <BrowserRouter basename='/'> 
        <Layout/>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
