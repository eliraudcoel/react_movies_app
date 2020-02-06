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
import Colors from '../constants/Colors';
import BobineImage from '../assets/images/bobine.jpg';
import ParallaxView from '../components/ParallaxView';
import { signIn } from '../utils/Api';
import ErrorModal from '../components/ErrorModal';
import { UserContext } from '../contexts/UserContext';

export function SignInScreen({ navigation }) {
    // States
    const [buttonStyle, setButtonStyle] = useState({});
    const [showLoading, setLoading] = useState(false);

    // Page information
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    // Redirect information
    const [redirectTo, setRedirectTo] = useState(navigation.getParam('redirectTo', null));
    const [redirectParams, setRedirectParams] = useState(navigation.getParam('redirectParams', {}));
    const [error, setError] = useState(navigation.getParam('error', null));

    // User context
    const [user, updateUser] = useContext(UserContext);

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

        return signIn(email, password)
            .then((response) => {
                console.log("RESPONSE", response);
                setLoading(false);

                return Promise.all([
                    storeToken(response.access_token),
                    storeId(response.id),
                    updateUser(response),
                ])
                .then((values) => {
                    console.log(values);
                    navigation.navigate('Home');
                })
            })
            .catch((error) => {
                console.log(error);
                // TODO show error
                // reject(error);
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
                    buttonStyle={[styles.button, buttonStyle]}
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
                    />
                    <Input
                        placeholder='Mot de passe'
                        autoCapitalize='none'
                        autoCompleteType='password'
                        secureTextEntry={true}
                        onChangeText={text => this.onChangePassword(text)}
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

            <ErrorModal visible={!!error} />

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

export default SignInScreen;