import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/redux/store.ts";
import App from "./App.tsx";
import "antd/dist/reset.css";
import "./styles/index.css";
import { SiderProvider } from "./app/context/SiderContext.tsx";
import { NightModeProvider } from "./app/context/NightModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NightModeProvider>
        <SiderProvider>
          <App />
        </SiderProvider>
      </NightModeProvider>
    </Provider>
  </React.StrictMode>,
);
