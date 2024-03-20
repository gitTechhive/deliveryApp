import AsyncStorage from '@react-native-async-storage/async-storage';
export default {
    /**
     * Retrieve data from AsyncStorage.
     * @param {string} key - The key to retrieve data.
     * @returns {Promise<any>} - A promise that resolves to the retrieved data.
     */
    getAsyncStorage: async (key) => {
        try {
            const asyncData = await AsyncStorage.getItem(key);
            // console.log('asyncData', asyncData);

            return asyncData ? JSON.parse(asyncData) : null;
        } catch (e) {
           // Handle error reading value
            console.log("Error while async storage read data");
        }
    },

    /**
    * Save data to AsyncStorage.
    * @param {string} key - The key to save data under.
    * @param {any} obj - The data to save.
    */
    saveDataToStorage: async (key, obj) => {
        try {

            const userObj = obj ? obj : null;
            console.log('userObj', userObj);
            await AsyncStorage.setItem(key, JSON.stringify({
                userObj
            }))
        } catch (e) {
           // Handle error reading value
            console.log("Error while async storage store data");
        }
    },

    /**
     * Remove an item from AsyncStorage.
     * @param {string} key - The key of the item to remove.
     */
    removeItem: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            // Handle error reading value
            console.log("Error while removing the data from Storage")
        }
    }
}