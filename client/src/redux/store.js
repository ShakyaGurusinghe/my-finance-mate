import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./User/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage for persistence

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage, // Use localStorage for persistence
  version: 1, // Version number for the persisted state
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for all actions
    }),
});

export const persistor = persistStore(store); // Create a persistor for the store
