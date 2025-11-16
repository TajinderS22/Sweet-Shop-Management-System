import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./store/store";
import { decodeToken } from "./utils/jwt";
import { setUser } from "./store/slices/UserSlice";

const token = localStorage.getItem('jwt');
if (token) {
  const decoded = decodeToken(token);
  if (decoded) {
   
    const user = localStorage.getItem('user');
    if (user) {
      store.dispatch(setUser(JSON.parse(user)));
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
