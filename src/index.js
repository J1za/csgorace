import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { rootReducer } from './redux/rootReducer';
import { createBrowserHistory } from 'history'

import App from './App.jsx';




import './i18n'

import reportWebVitals from './reportWebVitals';
export const history = createBrowserHistory();

export const store = createStore(rootReducer, compose(applyMiddleware(thunk), 
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

ReactDOM.render(
    <React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
