import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Platform } from 'react-native';
import theme, { dangerColor, warningColor } from '../../styleTheme';


const EnvironmentBar = ({
    env,

}) => {

  return (
      <View style={styles.container(env)}>
        <Text style={styles.text}>{`Environment status: ${env}`}</Text>
      </View>
  )
};

const styles = {

  container: (env) => ({

    top: 0,
    right: 0, left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,

    width: '100%',
    height: Platform.select({ios: 50, android: 20}),
    backgroundColor: env === "development" ? dangerColor.default : warningColor.default,

  }),
  text: {
    fontSize: 12,

  }
};
EnvironmentBar.propTypes = {
  env: PropTypes.string,
};

export default EnvironmentBar;