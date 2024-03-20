import {
  RESET_GENERIC_DATA,
} from "./generic.type";
import { RooteAction } from "..";

/**
 * Action creator function for resetting generic data.
 * This function creates an action object that represents resetting generic data.
 * @returns Action object with type RESET_GENERIC_DATA and an empty payload.
 */
export const resetGenericData = (): RooteAction => {
  return { type: RESET_GENERIC_DATA, payload: {} };
};
