import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./State/authSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducre = persistReducer(persistConfig, authSlice);
const store = configureStore({
  reducer: persistedReducre,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, REGISTER, REHYDRATE, PERSIST, PURGE],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
