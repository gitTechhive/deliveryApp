import { LoaderAction } from "./loader.action";
import { LOADING } from "./loader.type";

/** Initial state for loader reducer */
const initialState = {
  /** Initially, loading is set to false */
  loading: false,
};
/** Interface for the initial state of loader reducer */
export interface LoaderReducerInitialState {
  /** Indicates whether loading is active */

  loading: boolean;
}

/**
 * Reducer function for managing loading state.
 * This function handles loading-related actions and updates the loading state accordingly.
 * @param state Current loading state
 * @param action Action dispatched to update the loading state
 * @returns Updated loading state
 */
function appReducer(
  state: LoaderReducerInitialState = initialState,
  action: LoaderAction
): LoaderReducerInitialState {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}
export default appReducer;
