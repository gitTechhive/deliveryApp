import { Image, LogBox, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
// import { LogoSvg } from './src/components/svg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import storage from './src/utility/storage/asyncStorage';
import Toast from 'react-native-toast-message';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import storeIndex from './src/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './src/store/index';
import { isEmptyObjectOrNullUndefiend } from './src/utility/Helper';
import { toastConfig } from './src/utility/toast/index';
export default class App extends Component<any, any> {


  // styles = StyleSheet.create({});
  constructor(props) {
    // console.log("constructor called");
    super(props);
    this.state = {
      isLogin: -1,
    } // this is our initial data

    LogBox.ignoreLogs(['Reanimated 2']);
    LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
    LogBox.ignoreAllLogs();
  }


  async componentDidMount() {
    // console.log("componentDidMount called");
    try {
      await this.checkUserLogin();
    } catch (err) {
      console.log(err);
    }
  }
  checkUserLogin = async () => {
    const userDetails = await storage.getAsyncStorage('userDetails');
    if (!isEmptyObjectOrNullUndefiend(userDetails)) {
      this.setState({ isLogin: 1 });
    } else {
      this.setState({ isLogin: 0 });

    }
  }

  render() {
    if (this.state.isLogin == -1) {
      return null;
    }
    const Stack = createNativeStackNavigator();
    return (

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={this.state.isLogin == 1 ? 'Home' : 'Login'}>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} ref={(ref: any) => Toast.setRef(ref)} />
      </Provider>
    );
  }



}

