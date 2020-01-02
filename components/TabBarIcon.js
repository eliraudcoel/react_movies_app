import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Icon from "./Icon";

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Icon
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      {...props}
    />
  );
}
