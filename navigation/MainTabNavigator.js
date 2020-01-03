import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

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
      navigationOptions: ({ navigation }) => {
        return {
          headerStyle: {
            backgroundColor: "#ddd",
          },
          header: null,
        }
      }
    },
    Movie: {
      screen: MovieScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // headerTintColor: Theme.COLOR.HIGHLIGHT,
          // headerStyle: {
          //   backgroundColor: Theme.COLOR.PRIMARY,
          // },
          headerTitleStyle: {
            flex: 1
          },
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
      family={"material"}
      focused={focused}
      name={"local-movies"}
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
      family={"ionicons"}
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
      family={"ionicons"}
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
