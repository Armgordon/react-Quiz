import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

//Redux add
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from "./store/reducers/rootReducer";
import reduxThunk from 'redux-thunk'

const composeEnhancers =
    (typeof window !== 'undefined' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const store = createStore(rootReducer,
    composeEnhancers(
        applyMiddleware(
            reduxThunk
        )
    ))

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
const app = (

    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    )

root.render(
    app

)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
