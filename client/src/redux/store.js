import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { REHYDRATE } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({user: userReducer, cart: cartReducer,})
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer
});

// Creating the persistor with the store instance
const persistor = persistStore(store);

export { store, persistor };