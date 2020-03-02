import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Constants from 'expo-constants'; // 'expo-constants' with the latest SDK to date
// Safe Area
import { useSafeArea } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import { UserContext } from '../contexts/UserContext';

export default function SettingsScreen() {
  // Get SafeArea details - came from SafeAreaProvider declare on App.js file
  const insets = useSafeArea();

  const [email, setEmail] = useState(null);

  // Context
  const [user, updateUser] = useContext(UserContext);

  // Équivalent à componentDidMount plus componentDidUpdate :
  useEffect(() => {
    setEmail(user.email);
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
      <View style={[styles.settingsContainer, { paddingTop: insets.top }]}>
        {
          [
            { title: 'Version', subtitle: Constants.manifest.version, icon: { type: 'ionicon', name: 'ios-bookmarks' } },
            { title: 'Email', subtitle: email, icon: { name: 'email' } }
          ].map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={item.icon}
              bottomDivider
            // chevron
            />
          ))
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  settingsContainer: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  }
});