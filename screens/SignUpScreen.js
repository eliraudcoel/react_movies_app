import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    Dimensions,
    Keyboard,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import BobineImage from '../assets/images/bobine.jpg';
import ParallaxView from '../components/ParallaxView';

export function SignUpScreen({ navigation }) {
    // States
    const [buttonStyle, setButtonStyle] = useState({});
    const [showLoading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [movieId, setMovieId] = useState(navigation.getParam('movieId', null));
    const [action, setAction] = useState(navigation.getParam('action', null));

    const { height } = Dimensions.get('window');

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
        setButtonStyle({
            paddingBottom: 20,
        })
    };

    _keyboardDidHide = () => {
        setButtonStyle(null);
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
        return AsyncStorage.setItem('access_token', accessToken)
            .catch((error) => {
                console.log("ERROR ON STORAGE", error);
            })
    }

    // connect = () => {
    //     setLoading(true);

    //     return connect(email, password)
    //         .then((response) => {
    //             console.log("RESPONSE", response);
    //             setLoading(false);

    //             return storeToken(response.access_token)
    //                 .then(() => {
    //                     navigation.navigate('Home');
    //                 });
    //         })
    //         .catch((error) => {
    //             reject(error);
    //         })
    // }

    return (
        <ParallaxView
            backgroundSource={BobineImage}
            windowHeight={height * 0.4}
            scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
            style={styles.borderRadius}
            bottomContainer={(
                <Button
                    title="JE M'INSCRIS" type="solid"
                    buttonStyle={[styles.button, buttonStyle]}
                    titleStyle={styles.buttonText}
                    // onPress={() => connect()}
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
                    />
                    <Input
                        placeholder='Mot de passe'
                        autoCapitalize='none'
                        autoCompleteType='password'
                        secureTextEntry={true}
                        onChangeText={text => this.onChangePassword(text)}
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
        paddingBottom: 30,
        paddingTop: 20,
    },
    buttonText: {
        fontSize: 20,
    }
});

export default SignUpScreen;