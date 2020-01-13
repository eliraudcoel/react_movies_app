import React, { Component } from 'react';
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

export class SignInScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = {
            buttonStyle: {}
        };
    }


    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        this.setState({
            buttonStyle: {
                paddingBottom: 20,
            }
        })
    };

    _keyboardDidHide = () => {
        this.setState({ buttonStyle: {} })
    }

    goToSignUp = () => {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        let { height } = Dimensions.get('window');

        return (
            // TODO : make it a component
            <ParallaxView
                backgroundSource={BobineImage}
                windowHeight={height * 0.4}
                scrollableViewStyle={[styles.scrollView, styles.borderRadius]}
                style={styles.borderRadius}
                bottomContainer={(
                    <Button
                        title="JE ME CONNECTE" type="solid"
                        buttonStyle={[styles.button, this.state.buttonStyle]}
                        titleStyle={styles.buttonText}
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
                        />
                        <Input
                            placeholder='Mot de passe'
                            autoCapitalize='none'
                            autoCompleteType='password'
                            secureTextEntry={true}
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

            </ParallaxView>
        );
    }
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