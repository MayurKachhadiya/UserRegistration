import React from 'react';
import { Platform, Text,View, StyleSheet } from 'react-native';

import defaultStyles from '../config/styles';

export default function AppText({ children, style, ...otherProps }) {
    return (
        <View>
            <Text {...otherProps} style={[defaultStyles.text, style]}>{children}</Text>
        </View>
    );
}
