import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import themes from '../../styleTheme';

export default () => (
    <View style={themes.base.noContentView}>
      <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default} />
    </View>
)

