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
          // header: null,
        }
      }
    },
    SignUp: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'none',
    mode: 'modal',
  }
);

ConnectionStack.path = '';

export default ConnectionStack;
