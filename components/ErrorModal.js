import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import Colors from '../constants/Colors';

export default function ErrorModal(props) {
    // States
    const [visible, setVisible] = useState(props.visible);
    const [error, setError] = useState(props.error);

    useEffect(() => {
        setVisible(props.visible);
    }, [props.visible]);

    useEffect(() => {
        setError(props.error);
    }, [props.error]);

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
                    <Text style={{textAlign: "center", paddingBottom: 5, paddingTop: 5}}>{error.title}</Text>
                    <Text style={{textAlign: "center", paddingBottom: 5, paddingTop: 5}}>{error.body}</Text>
                </View>
                <Button
                    title="Compris"
                    type="clear"
                    onPress={() => props.closeModal()}
                />
            </View>
        </Overlay>
    );
}