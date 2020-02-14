import React from 'react';
import { Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

export default function TabBarInfo(props) {
    return (
        <View style={styles.tabBarInfoContainer}>
            <Icon
                type="ionicon"
                size={26}
                name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
                color={"red"}
            />
            <Text style={styles.tabBarInfoText}>
                Ajouté au favori !
            </Text>
        </View>
    );
}

const styles = {
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    }
}