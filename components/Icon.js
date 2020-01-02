import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function Icon(props) {
  switch (props.family) {
    case "ionicons": {
      return <Ionicons
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    }
    case "material": {
      return <MaterialIcons
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    }
    default: {
      return <Ionicons
        name={props.name}
        size={props.size}
        style={props.style}
        color={props.color}
      />
    }
  }
}