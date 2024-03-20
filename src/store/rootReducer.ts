import { combineReducers, Reducer } from "redux";
import appReducer from "./Loader/loader.reducer";
import loginReducer from './Login/login.reducer';

/**Combining multiple reducers into a single root reducer  */
const rootReducer = combineReducers({
  appReducer,
  loginReducer
});

/** Defining types for better type safety */
export type rootReducerType = ReturnType<typeof rootReducer>;
export type LoaderReducerType = ReturnType<typeof appReducer>;
export type LogInReducerType = ReturnType<typeof loginReducer>;

export default rootReducer;
