import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'remodal/dist/remodal.js'
import 'remodal/dist/remodal.css'
import 'remodal/dist/remodal-default-theme.css'
import "./index.css";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
