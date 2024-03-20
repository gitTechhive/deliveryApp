import { AppDispatch } from "..";
import { LOGIN_API } from "../../utility/ApiList";
import { post } from "../../utility/httpInterceptor";
import toast from "../../utility/toast";
import { loading } from "../Loader/loader.action";
import { loginFailure, loginSuccess } from "../Login/login.action";

/**
 * LOGIN API
 * @param {*} objBody
 * @method loginAPI
 * @url /auth/register
 * @returns API will return login details
 */
export const loginAPI =
    (objBody: any = undefined) =>
        async (dispatch: AppDispatch) => {
            /** Dispatch loading action to indicate that login process has started */
            dispatch(loading(true));
            try {
                // calling the login API
                const response: any = await post(LOGIN_API, objBody, true);
                // console.log(response);
                // If login is successful
                if (!response.data.error) {
                    // Display success message
                    toast.showToast(false, '', 'Logged In Successfully');
                    // Dispatch action indicating successful login
                    return dispatch(loginSuccess(response.data.data));
                } else {
                    // If login fails, display error message
                    toast.showToast(true, '', response.data.message);
                    // Dispatch action indicating login failure
                    dispatch(loginFailure());
                }
            } catch (err) {
                // If an error occurs during login process, dispatch action indicating login failure
                dispatch(loginFailure());
            } finally {
                // Dispatch loading action to indicate that login process has finished
                dispatch(loading(false));
            }
        };