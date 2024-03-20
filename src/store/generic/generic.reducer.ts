import { RooteAction } from "..";
import {
  RESET_GENERIC_DATA
} from "./generic.type";

/**
 * Interface for the initial state of generic data.
 * This interface defines the structure of the initial state for generic data.
 */
export interface GenericInitialState {
  /**  Indicates whether data is currently loading */
  loading: boolean;
}

/**  Initial state for generic data */
const initialState: GenericInitialState = {
  loading: false,
};

/**
 * Reducer function for managing state changes of generic data.
 * This function handles actions related to generic data and returns the updated state.
 * @param state Current state of generic data
 * @param action Action dispatched to update the state
 * @returns Updated state of generic data
 */
const genericReducer = (
  state: GenericInitialState = initialState,
  action: RooteAction
): GenericInitialState => {
  switch (action.type) {
    case RESET_GENERIC_DATA:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default genericReducer;
