import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function ErrorModal(props) {
    // States
    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(visible);
    }, [visible]);

    return (
        <Overlay
            isVisible={visible}
            windowBackgroundColor="rgba(0, 0, 0, .5)"
            width="auto"
            height="auto"
        >
            <View style={{ width: 300, alignItems: "center", justifyContent: "center" }}>
                <Icon
                    type='material'
                    size={70}
                    name='error'
                    color={Colors.tintColor}
                    underlayColor={Colors.transparent}
                    onPress={() => this.goBack()}
                />
                <View style={{ paddingTop: 20, paddingBottom: 20, alignItems: "center"}}>
                    <Text style={{textAlign: "center", paddingBottom: 5, paddingTop: 5}}>Oups!</Text>
                    <Text style={{textAlign: "center", paddingBottom: 5, paddingTop: 5}}>Votre session à expirer</Text>
                    <Text style={{textAlign: "center", paddingBottom: 5, paddingTop: 5}}>Afin de profiter de notre service, veuillez vous identifier à nouveau.</Text>
                </View>
                <Button
                    title="Compris"
                    type="clear"
                    onPress={() => setVisible(false)}
                />
            </View>
        </Overlay>
    );
}