import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "remodal/dist/remodal.js";
import "remodal/dist/remodal.css";
import "remodal/dist/remodal-default-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import { toast } from 'react-toastify';
import App from "./components/App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

toast.configure()
export const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
