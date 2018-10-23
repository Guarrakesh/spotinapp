import React from 'react';
import { userCheck } from '../actions/authActions';

import { connect } from 'react-redux';

import { View, Image, ActivityIndicator} from 'react-native';

const Logo = require('../assets/img/logo/logo.png');
const Together = require('../assets/img/together/together.png');

class Launcher extends React.Component {
  componentDidMount() {
     this.props.userCheck({redirectOnResolve: {pathName: "Main"}});
  }


  render() {
    const { isLoading } = this.props;
    return (
        <View style={styles.container}>
          <Image resizeMethod={"scale"} resizeMode="contain" style={styles.logo} source={Logo}/>
          <Image source={Together} resizeMethod={"scale"} resizeMode="contain" style={{marginTop: 12, width: 240, height: 128}}/>
          {isLoading && <ActivityIndicator size="large"/>}
        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
    backgroundColor: 'white'
  },
  logo: {
    width: 240,
    height: 148
  }

};


export default connect(state => ({
  isLoading: state.loading > 0
    })
, { userCheck })(Launcher);