import React from 'react';
import { userCheck } from '../actions/authActions';

import { connect } from 'react-redux';

import { View, Image, ActivityIndicator} from 'react-native';

const Logo = require('../assets/img/logo.png');

class Launcher extends React.Component {
  componentDidMount() {
     this.props.userCheck({redirectOnResolve: {pathName: "Main"}});
  }


  render() {
    const { isLoading } = this.props;
    return (
        <View style={styles.container}>
          <Image resizeMethod={"scale"} resizeMode="contain" style={styles.logo} source={Logo}/>
          {isLoading && <ActivityIndicator size="large"/>}
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


export default connect(state => ({
  isLoading: state.loading > 0
    })
, { userCheck })(Launcher);