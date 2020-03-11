import React, { useEffect, useState, useContext } from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Dimensions,
    AsyncStorage,
    Keyboard,
    Platform,
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { useSafeArea } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';
import BobineImage from '../assets/images/bobine.jpg';
import ParallaxView from '../components/ParallaxView';
import { signIn } from '../utils/Api';
import ErrorModal from '../components/ErrorModal';
import { UserContext } from '../contexts/UserContext';

export function SignInScreen({ navigation }) {
    // States
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const [showLoading, setLoading] = useState(false);

    // Page information
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // Redirect information
    const [redirectTo, setRedirectTo] = useState(navigation.getParam('redirectTo', null));
    const [redirectParams, setRedirectParams] = useState(navigation.getParam('redirectParams', {}));
    const [error, setError] = useState(navigation.getParam('error', null));
    const [errorVisible, setErrorVisible] = useState(false);

    // User context
    const [user, updateUser] = useContext(UserContext);

    // Get height of the screen
    const { height } = Dimensions.get('window');

    // Get SafeArea details - came from SafeAreaProvider declare on App.js file
    const insets = useSafeArea();

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        return function cleanup() {
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');
        };
    }, []);

    useEffect(() => {
        if (error) {
            setErrorVisible(true);
        }
    }, [error]);

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

    /**
     * errorReport - Display error if Token has expired
     * @param {Object} error 
     */
    async function errorReport(error) {
        return new Promise((resolve, reject) => {
            switch (error.error_code) {
                case "Exceptions::EmailNotFound":
                    setError({
                        title: 'Votre email est introuvable',
                        body: "Nous n'avons pas trouvé votre email dans notre base, vous êtes bien inscris ici ?"
                    })
                    break;
                case "Exceptions::InvalidPassword":
                    setError({
                        title: 'Votre mot de passe est incorrect',
                        body: "Vous avez un trou de mémoire ? Pas de panique, cliquez sur mot de passe oublié ;)"
                    })
                    break;
                default:
                    break;
            }
            resolve();
        })
    }

    connect = () => {
        setLoading(true);

        return signIn(email, password)
            .then((response) => {
                setLoading(false);
                console.log("signIn()", response.access_token);

                return Promise.all([
                    storeToken(response.access_token),
                    storeId(response.id),
                    updateUser(response),
                ]).then((values) => {
                    if (redirectTo) {
                        goBack();
                    } else {
                        navigation.navigate('Home');
                    }
                })
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                return errorReport(error);
            })
    }

    goBack = () => {
        // GO BACK not working
        // this.props.navigation.goBack();

        navigation.navigate(redirectTo, redirectParams);
    }

    return (
        <ParallaxView
            backgroundSource={BobineImage}
            windowHeight={height * 0.4}
            scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
            style={styles.borderRadius}
            header={(
                <Icon
                    type='ionicon'
                    size={70}
                    name={Platform.OS === 'ios' ? 'ios-close-circle' : 'md-close-circle'}
                    color={Colors.whiteColor}
                    containerStyle={{
                        paddingTop: (height * 0.1),
                    }}
                    underlayColor={Colors.transparent}
                    onPress={() => this.goBack()}
                />
            )}
            bottomContainer={(
                <Button
                    title="JE ME CONNECTE" type="solid"
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
                        blurOnSubmit={false}

                        // next button logic => go to next input
                        returnKeyType="next"
                        onSubmitEditing={() => { this.passwordInput.focus(); }}
                    />
                    <Input
                        placeholder='Mot de passe'
                        autoCapitalize='none'
                        autoCompleteType='password'
                        secureTextEntry={true}
                        onChangeText={text => this.onChangePassword(text)}

                        // next button logic => remove keyboard
                        returnKeyType="done"
                        ref={(input) => { this.passwordInput = input; }}
                    />
                    <View style={styles.link}>
                        <Button
                            title="Mot de passe oublié ?"
                            type="clear"
                            titleStyle={{ textDecorationLine: 'underline' }}
                        />
                    </View>
                    <View style={styles.link}>
                        <Button
                            title="S'inscrire"
                            type="clear"
                            onPress={() => this.goToSignUp()}
                        />
                    </View>
                </View>
            </View>

            <ErrorModal visible={errorVisible} error={error} closeModal={() => setErrorVisible(false)} />

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

export default SignInScreen;