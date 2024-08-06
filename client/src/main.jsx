import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index.js";
import { SpinnerLoader } from "./components/common/loader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center w-full bg-black/0">
            <SpinnerLoader />
          </div>
        }
      >
        <App />
      </Suspense>
    </BrowserRouter>
  </Provider>
);
