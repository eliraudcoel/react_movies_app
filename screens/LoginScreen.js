import React, { Component } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    StatusBar,
    View,
    Dimensions,
    Image,
} from 'react-native';
import { Input, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';
import BobineImage from '../assets/images/bobine.jpg';
import ParallaxView from '../components/ParallaxView';

export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;

        this.state = {
        };
    }

    componentWillMount() {
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
            >
                <StatusBar barStyle="light-content" backgroundColor={Colors.transparent} />
                <View style={[styles.containerView, styles.borderRadius]}>
                    <Input
                        placeholder='Email'
                    // leftIcon={
                    //     <Icon
                    //         name='mail'
                    //         size={24}
                    //         color='black'
                    //     />
                    // }
                    // containerStyle={{
                    //     paddingLeft: 0
                    // }}
                    // inputStyle={{
                    //     backgroundColor: 'green',
                    //     paddingLeft: 20,
                    // }}
                    // leftIconContainerStyle={{
                    //     left: 0,
                    //     backgroundColor: 'red'
                    // }}
                    />
                    <View style={styles.divider}></View>
                    <Input
                        placeholder='Mot de passe'
                    // leftIcon={
                    //     <Icon
                    //         name='lock'
                    //         size={24}
                    //         color='black'
                    //     />
                    // }
                    // containerStyle={{backgroundColor: 'green'}}
                    // leftIconContainerStyle={{backgroundColor: 'red'}}
                    />
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
    containerView: {
        flex: 1,
        height: 500,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    containerText: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: 'black'
    },
    divider: {
        height: 20,
    }
});

export default LoginScreen;