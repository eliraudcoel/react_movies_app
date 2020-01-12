import { createStackNavigator } from 'react-navigation';

import LoginScreen from "../screens/LoginScreen";

/*
 * SIGNUP / LOGIN
*/
const ConnectionStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => {
        return {
          header: null,
        }
      }
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
    mode: 'modal',
  }
);

ConnectionStack.path = '';

export default ConnectionStack;
