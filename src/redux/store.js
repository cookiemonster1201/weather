import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
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
import countriesReducer from './slices/countriesSlice'; 
import weatherReducer from './slices/weatherSlice';
const persistConfig = { 
  key: 'countries', 
  storage, 
}
const persistedReducer = persistReducer(persistConfig, countriesReducer);
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

export const store = configureStore({
    reducer: {
        searchedWeather:weatherReducer,
        countries:persistedReducer
  },
  middleware,
  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);
