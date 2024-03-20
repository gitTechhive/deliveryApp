
import { RooteAction } from '..';
import { LOGIN } from './login.type';

export const loginSuccess = (obj): RooteAction => {
    return { type: LOGIN, payload: obj };
};
export const loginFailure = (): RooteAction => {
    return { type: LOGIN, payload: {} };
};
