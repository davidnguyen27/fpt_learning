import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/redux/store.ts";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./styles/index.css";
import { SiderProvider } from "./app/context/SiderContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "./const/clientID.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <SiderProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </SiderProvider>
    </Provider>
  </React.StrictMode>,
);
