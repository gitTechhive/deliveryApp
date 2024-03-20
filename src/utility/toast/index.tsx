import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


export const toastConfig = {
    /**
     * Configuration for success toast messages.
     * @param {object} props - Props passed to the BaseToast component.
     * @returns {JSX.Element} - JSX element representing the success toast.
     */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green', transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),
   
     /**
     * Configuration for error toast messages.
     * @param {object} props - Props passed to the ErrorToast component.
     * @returns {JSX.Element} - JSX element representing the error toast.
     */
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' ,transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    )
};
export default {
    /**
     * Display a toast message.
     * @param {boolean} isError - Indicates whether the message is an error.
     * @param {string} title - The title of the toast message.
     * @param {string} message - The content of the toast message.
     */
    showToast: (isError, title, message) => {
        Toast.show({
            // Determine the type of the toast based on whether it's an error
            type: isError ? 'error' : 'success',
            // Define the position of the toast
            position: 'top',
            // Set the title of the toast
            text1: title,
            // Set the message content of the toast
            text2: message,
            // Set the visibility time of the toast (in milliseconds)
            visibilityTime: 4000,
            // Specify whether the toast should auto-hide
            autoHide: true,
            // Set the top offset of the toast
            topOffset: 30,
            // Set the bottom offset of the toast
            bottomOffset: 40,
            // Callback function invoked when the toast is shown
            onShow: () => { },
            // Callback function invoked when the toast is hidden
            onHide: () => { },
            // Callback function invoked when the toast is pressed
            onPress: () => { },
        });
    }
};