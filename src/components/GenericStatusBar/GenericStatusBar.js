import React from 'react';
import { View, StatusBar } from 'react-native';
//import styles from './styles/GeneralStatusBarColorStyles';
const GenericStatusBarColor = ({ backgroundColor, ...props }) => (
    <View style={[{ backgroundColor }]}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
);
export default GenericStatusBarColor;
