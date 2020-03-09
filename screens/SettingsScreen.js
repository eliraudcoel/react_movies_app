import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  AsyncStorage,
  Text,
  Dimensions
} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import Constants from 'expo-constants'; // 'expo-constants' with the latest SDK to date
// Safe Area
import { useSafeArea } from 'react-native-safe-area-context';

import Colors from '../constants/Colors';
import ParallaxView from '../components/ParallaxView';
import { UserContext } from '../contexts/UserContext';

export default function SettingsScreen({ navigation }) {
  // Get SafeArea details - came from SafeAreaProvider declare on App.js file
  const insets = useSafeArea();

  const [showLoading, setLoading] = useState(false);
  const [settingsList, updateSettingsList] = useState([
    { title: 'Version', subtitle: Constants.manifest.version, icon: { type: 'ionicon', name: 'ios-bookmarks' } }
  ]);

  // Context
  const [user, updateUser] = useContext(UserContext);

  const { height } = Dimensions.get('window');

  // Équivalent à componentDidMount plus componentDidUpdate :
  useEffect(() => {
    if (user && user.email) {
      updateSettingsList([
        ...settingsList,
        { title: 'Email', subtitle: user.email, icon: { name: 'email' } }
      ])
    } else {
      updateSettingsList([
        { title: 'Version', subtitle: Constants.manifest.version, icon: { type: 'ionicon', name: 'ios-bookmarks' } }
      ])
    }
  }, [user]);

  logOut = () => {
    setLoading(true);

    return Promise.all([
      AsyncStorage.removeItem('access_token'),
      AsyncStorage.removeItem('user_id')
    ]).then(() => {
      updateUser(null);
      setLoading(false);

      navigation.navigate('Home');
    });
  }

  signIn = () => {
    navigation.navigate('SignIn', { redirectTo: 'Settings' });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />

      <View style={[{ flex: 1, backgroundColor: Colors.lightTintColorDarker }, { paddingTop: insets.top }]}>
        <View>
          <Text style={{ color: Colors.whiteColor, fontSize: 40, paddingTop: 20, paddingLeft: 10 }}>Bonjour {user ? "" : "!"}</Text>
          {user && user.email &&
            <Text style={{ color: Colors.whiteColor, fontSize: 40, paddingTop: 20, paddingLeft: 10 }}>{user.email}!</Text>
          }
        </View>
        {!user &&
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ color: Colors.whiteColor, fontSize: 20, paddingLeft: 10 }}>
              Pour profiter du service ... Connectez / Inscrivez vous !
            </Text>
            <Text style={{ color: Colors.whiteColor, fontSize: 20, paddingTop: 20, paddingLeft: 10 }}>
              Allez y c'est gratuit ;)
            </Text>
          </View>
        }
      </View>

      <View style={[styles.settingsContainer, styles.borderRadius]}>
        {
          settingsList.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={item.icon}
              bottomDivider
            />
          ))
        }
      </View>

      {user ? (
        <Button
          title="Se déconnecter" type="clear"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => logOut()}
          loading={showLoading}
        />
      ) : (
          <Button
            title="Se connecter" type="clear"
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => signIn()}
          />
        )}
    </SafeAreaView >
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
  },
  borderRadius: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    paddingBottom: 30,
    paddingTop: 20,
  },
  buttonText: {
    color: Colors.tintColor,
    fontSize: 20,
  }
});