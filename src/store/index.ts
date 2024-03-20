import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistStore, persistReducer, Persistor } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
/** Middleware: Redux Persist Config  */
const persistConfig = {
  // Root?
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: [],
  // Blacklist (Don't Save Specific Reducers)
  blacklist: [],
};

/**  Middleware: Redux Persist Persisted Reducer  */
const persistedReducer = persistReducer(persistConfig, rootReducer);
 const store = createStore(
  // persistedReducer,
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/**  Middleware: Redux Persist Persister */
 let persistor = persistStore(store);

/** Type representing the state of the Redux store */
export type RootState = ReturnType<typeof store.getState>;

/** Type representing the dispatch function of the Redux store */
export type AppDispatch = typeof store.dispatch;

/**Type representing a Redux action  */
export type RooteAction = { type: string; payload: any };

// export default {store, persistor};
export default store;
