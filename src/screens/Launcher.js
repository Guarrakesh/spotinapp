import React from 'react';
import { userCheck } from '../actions/authActions';

import { connect } from 'react-redux';

import { View, Image } from 'react-native';

const Logo = require('../assets/img/logo.png');

class Launcher extends React.Component {
  componentDidMount() {
     this.props.userCheck({redirectOnResolve: {pathName: "Main"}});
  }


  render() {
    return (
        <View style={styles.container}>
          <Image resizeMethod={"scale"} resizeMode="contain" style={styles.logo} source={Logo}/>
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 256,
    height: 256,
  }

};


export default connect(null, { userCheck })(Launcher);