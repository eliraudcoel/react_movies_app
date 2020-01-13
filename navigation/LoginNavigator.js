import { createStackNavigator } from 'react-navigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import Colors from '../constants/Colors';

/*
 * SIGNUP / LOGIN
*/
const ConnectionStack = createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => {
        return {
          header: null,
          headerBackTitle: null,
        }
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => {
        return {
          headerBackTitle: null,
          headerTransparent: true,
          headerTintColor: Colors.lightColor,
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: Colors.transparent
          },
        }
      }
    },
  },
  {
    initialRouteName: 'SignIn',
    mode: 'modal',
  }
);

ConnectionStack.path = '';

export default ConnectionStack;
