import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MovieScreen from '../screens/MovieScreen';

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
          headerBackTitle: null,
        }
      }
    },
    Movie: {
      screen: MovieScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerBackTitle: null,
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
            containerStyle={{ paddingRight: 15 }}
            onPress={() => navigation.getParam('likeUnlike')(navigation.getParam('isFavorite'), navigation.getParam('movie'))}
          />,
          title: navigation.getParam('title'),
        }
      }
    }
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type='material'
      focused={focused}
      name='home'
    />
  ),
};

HomeStack.path = '';

/*
 * MOVIES
*/
const MoviesStack = createStackNavigator(
  {
    UserMovies: {
      screen: MoviesScreen,
      navigationOptions: () => {
        return {
          headerBackTitle: null,
          headerTransparent: true,
          headerTintColor: Colors.lightColor,
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: Colors.tintColor
          },
          title: 'Your Movies'
        }
      }
    },
    UserMovie: {
      screen: MovieScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerBackTitle: null,
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
            containerStyle={{ paddingRight: 15 }}
            onPress={() => navigation.getParam('likeUnlike')(navigation.getParam('isFavorite'), navigation.getParam('movie'))}
          />,
          title: navigation.getParam('title'),
        }
      }
    }
  },
  config
);

MoviesStack.navigationOptions = {
  tabBarLabel: 'Movies',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      type='material'
      focused={focused}
      name='local-movies'
    />
  ),
};

MoviesStack.path = '';

/*
 * SETTINGS
*/
const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: () => {
        return {
          headerBackTitle: null,
          headerTransparent: true,
          headerTintColor: Colors.lightColor,
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: Colors.tintColor
          },
          title: 'Réglages'
        }
      }
    }
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
    MoviesStack,
    SettingsStack,
  },
  { tabBarOptions }
);

tabNavigator.path = '';

export default tabNavigator;
