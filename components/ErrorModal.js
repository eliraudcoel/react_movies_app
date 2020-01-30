import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Overlay } from 'react-native-elements';

export default function ErrorModal(props) {
    // States
    const [visible, setVisible] = useState(props.visible);

    useEffect(() => {
        setVisible(visible);
    }, [visible]);

    // TODO : improve display
    return (
        <Overlay
            isVisible={visible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="red"
            width="auto"
            height="auto"
        >
            <Text>Hello from Overlay!</Text>
        </Overlay>
    );
}