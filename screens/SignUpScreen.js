import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Dimensions,
    AsyncStorage,
    Keyboard,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import BobineImage from '../assets/images/bobine.jpg';
import ParallaxView from '../components/ParallaxView';
import { signUp } from '../utils/Api';
import { UserContext } from '../contexts/UserContext';

// TODO : make it unique with SignUp
export function SignUpScreen({ navigation }) {
    // States
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [showLoading, setLoading] = useState(false);

    // Page information
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // Redirect information
    const [redirectTo, setRedirectTo] = useState(navigation.getParam('redirectTo', null));
    const [redirectParams, setRedirectParams] = useState(navigation.getParam('redirectParams', {}));

    // User context
    const [user, updateUser] = useContext(UserContext);

    // Get height of the screen
    const { height } = Dimensions.get('window');

    // Get SafeArea details - came from SafeAreaProvider declare on App.js file
    const insets = useSafeArea();

    // Équivalent à componentDidMount plus componentDidUpdate :
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return function cleanup() {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    _keyboardDidShow = () => {
        // Remove paddingBottom only when there are bottom's inset 
        setKeyboardOpen(true)
    };

    _keyboardDidHide = () => {
        setKeyboardOpen(false);
    }

    goToSignUp = () => {
        navigation.navigate('SignUp')
    }

    onChangeEmail = (email) => {
        setEmail(email);
    }

    onChangePassword = (password) => {
        setPassword(password);
    }


    storeToken = (accessToken) => {
        return AsyncStorage.setItem('access_token', accessToken.toString())
            .catch((error) => {
                console.log("ERROR ON STORAGE", error);
            })
    }

    storeId = (id) => {
        return AsyncStorage.setItem('user_id', id.toString())
            .catch((error) => {
                console.log("ERROR ON STORAGE", error);
            })
    }

    connect = () => {
        setLoading(true);

        return signUp(email, password)
            .then((response) => {
                setLoading(false);

                return Promise.all([
                    storeToken(response.access_token),
                    storeId(response.id),
                    updateUser(response),
                ])
                    .then((values) => {
                        navigation.navigate('Home');
                    })
            })
            .catch((error) => {
                console.log(error);
                // TODO show error
                // reject(error);
            })
    }

    return (
        <ParallaxView
            backgroundSource={BobineImage}
            windowHeight={height * 0.4}
            scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
            style={styles.borderRadius}
            bottomContainer={(
                <Button
                    title="JE M'INSCRIS" type="solid"
                    buttonStyle={[styles.button, {
                        // Logic :
                        // keyboardOpen => always 20
                        // if insets on bottom of the page -> set 30
                        paddingBottom: (keyboardOpen || insets.bottom === 0) ? 20 : 30,
                    }]}
                    titleStyle={styles.buttonText}
                    onPress={() => connect()}
                    loading={showLoading}
                />
            )}
        >
            <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
            <View style={[styles.containerView, styles.borderRadius]}>
                <Text style={styles.text}>Connectez</Text>
                <Text style={styles.text}>Vous</Text>

                <View style={styles.formContainer}>
                <Input
                        placeholder='Email'
                        autoCapitalize='none'
                        autoCompleteType='email'
                        containerStyle={styles.divider}
                        onChangeText={text => this.onChangeEmail(text)}
                        // TODO : make it works on Platform Android
                        blurOnSubmit={false}

                        // next button logic => go to next input
                        returnKeyType="next"
                        onSubmitEditing={() => { this.pwdInput.focus(); }}
                    />
                    <Input
                        placeholder='Mot de passe'
                        autoCapitalize='none'
                        autoCompleteType='password'
                        secureTextEntry={true}
                        onChangeText={text => this.onChangePassword(text)}

                        // next button logic => remove keyboard
                        returnKeyType="done"
                        ref={(input) => { this.pwdInput = input; }}
                    />
                </View>
            </View>

        </ParallaxView>
    );
}

const styles = StyleSheet.create({
    borderRadius: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollView: {
        top: -20,
    },
    textContainer: {
        paddingTop: 20,
        paddingLeft: 20,
    },
    text: {
        fontSize: 50,
        textAlign: "left",
        color: Colors.lightTintColorDarker
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerView: {
        flex: 1,
        height: 500,
        padding: 20,
    },
    divider: {
        paddingBottom: 20,
    },
    link: {
        paddingTop: 30,
    },
    button: {
        backgroundColor: Colors.tintColor,
        paddingTop: 20,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    buttonText: {
        fontSize: 20,
    }
});

export default SignUpScreen;