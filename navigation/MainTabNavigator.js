import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MovieScreen } from '../screens/MovieScreen';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const tabBarOptions = {
  activeTintColor: Colors.lightColor,
  inactiveTintColor: Colors.lightTintColorDarker,
  style: {
    backgroundColor: Colors.tintColor,
  },
};

/*
 * HOME
*/
const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => {
        return {
          header: null,
        }
      }
    },
    Movie: {
      screen: MovieScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTransparent: true,
          headerTintColor: Colors.lightColor,
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: Colors.blackLighter
          },
          headerRight: <Icon
            type="ionicon"
            size={26}
            name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
            color={navigation.getParam('isFavorite') ? 'red' : Colors.whiteColor}
            underlayColor={Colors.transparent}
            containerStyle={{paddingRight: 15}}
            onPress={() => navigation.getParam('likeUnlike')()}
          />,
          title: navigation.getParam('title'),
        }
      }
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Movies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type='material'
      focused={focused}
      name='local-movies'
    />
  ),
};

HomeStack.path = '';

/*
 * LINKS
*/
const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Likes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type='ionicon'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
    />
  ),
};

LinksStack.path = '';

/*
 * SETTINGS
*/
const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type='ionicon'
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    LinksStack,
    SettingsStack,
  },
  { tabBarOptions }
);

tabNavigator.path = '';

export default tabNavigator;
