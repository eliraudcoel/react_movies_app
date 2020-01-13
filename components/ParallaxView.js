/*
    IMPROVED CODE FOUNDED of plugin
    link : https://github.com/lelandrichardson/react-native-parallax-view
    name : react-native-parallax-view
*/
import React from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
} from 'react-native';

const ScrollableMixin = require('react-native-scrollable-mixin');
const PropTypes = require('prop-types')
const createReactClass = require('create-react-class');

let screen = Dimensions.get('window');
let ScrollViewPropTypes = ScrollView.propTypes;

var ParallaxView = createReactClass({
    mixins: [ScrollableMixin],

    propTypes: {
        ...ScrollViewPropTypes,
        windowHeight: PropTypes.number,
        backgroundSource: PropTypes.oneOfType([
            PropTypes.shape({
                uri: PropTypes.string,
            }),
            // Opaque type returned by require('./image.jpg')
            PropTypes.number,
        ]),
        header: PropTypes.node,
        blur: PropTypes.string,
        contentInset: PropTypes.object,
        bottomContainer: PropTypes.node,
    },

    getDefaultProps: function () {
        return {
            windowHeight: 300,
            contentInset: {
                top: screen.scale
            }
        };
    },

    getInitialState: function () {
        const scrollY = new Animated.Value(0);
        return {
            scrollY,
            onScroll: Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }]
            ),
        };
    },

    /**
     * IMPORTANT: You must return the scroll responder of the underlying
     * scrollable component from getScrollResponder() when using ScrollableMixin.
     */
    getScrollResponder() {
        return this._scrollView.getScrollResponder();
    },

    setNativeProps(props) {
        this._scrollView.setNativeProps(props);
    },

    renderBackground: function () {
        var { windowHeight, backgroundSource, blur } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.Image
                style={[styles.background, {
                    height: windowHeight,
                    transform: [{
                        translateY: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [windowHeight / 2, 0, -windowHeight / 3]
                        })
                    }, {
                        scale: scrollY.interpolate({
                            inputRange: [-windowHeight, 0, windowHeight],
                            outputRange: [2, 1, 1]
                        })
                    }]
                }]}
                source={backgroundSource}>
                {/*
                    !!blur && (BlurView || (BlurView = require('react-native-blur').BlurView)) &&
                    <BlurView blurType={blur} style={styles.blur} />
                */}
            </Animated.Image>
        );
    },

    renderHeader: function () {
        var { windowHeight, backgroundSource } = this.props;
        var { scrollY } = this.state;
        if (!windowHeight || !backgroundSource) {
            return null;
        }
        return (
            <Animated.View style={{
                position: 'relative',
                height: windowHeight,
                opacity: scrollY.interpolate({
                    inputRange: [-windowHeight, 0, windowHeight / 1.2],
                    outputRange: [1, 1, 0]
                }),
            }}>
                {this.props.header}
            </Animated.View>
        );
    },

    render: function () {
        var { style } = this.props;
        var onScroll = this.props.onScroll ? e => {
            this.props.onScroll(e);
            this.state.onScroll(e);
        } : this.state.onScroll;
        return (
            <KeyboardAvoidingView
                style={[styles.container, style]}
                behavior="padding"
                enabled
            >
                {this.renderBackground()}
                <ScrollView
                    ref={component => { this._scrollView = component; }}
                    {...this.props}
                    style={styles.scrollView}
                    onScroll={onScroll}
                    scrollEventThrottle={16}>
                    {this.renderHeader()}
                    <View style={[styles.content, this.props.scrollableViewStyle]}>
                        {this.props.children}
                    </View>
                </ScrollView>
                {this.props.bottomContainer}
            </KeyboardAvoidingView>
        );
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: 'transparent',
    },
    scrollView: {
        backgroundColor: 'transparent',
    },
    background: {
        position: 'absolute',
        backgroundColor: '#2e2f31',
        width: screen.width,
        resizeMode: 'cover'
    },
    blur: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
    },
    content: {
        shadowColor: '#222',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column'
    }
});

module.exports = ParallaxView;