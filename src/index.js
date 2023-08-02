import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //tüm uygulamayı kaplayan provider
  //App içersine yazıldı
  <Provider store={store}>
    <App />
  </Provider>
);
