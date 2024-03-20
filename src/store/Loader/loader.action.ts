import { LOADING } from "./loader.type";

/**
 * Interface for loader actions.
 * This interface defines the structure of actions related to loading.
 */
export interface LoaderAction {
  /** Action type */
  type: string;
  /** Payload indicating whether loading is active */
  payload: boolean;
}

/**
 * Action creator function for loading actions.
 * This function creates an action object to indicate loading status.
 * @param obj Boolean value indicating whether loading is active
 * @returns Action object representing loading status
 */
export const loading = (obj: boolean): LoaderAction => {
  return { type: LOADING, payload: obj };
};
