import { RooteAction } from "..";
import {
    LOGIN
} from "./login.type";

export interface LogInInitialState {
    loading: boolean;
    loginData: any
}

const initialState: LogInInitialState = {
    loading: false,
    loginData: null
};

const loginReducer = (
    state: LogInInitialState = initialState,
    action: RooteAction
): LogInInitialState => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: false,
                loginData: action.payload
            };

        default:
            return state;
    }
};

export default loginReducer;