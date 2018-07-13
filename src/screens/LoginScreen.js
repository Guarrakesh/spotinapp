import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from 'react-native-elements';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput

} from 'react-native';

import {loginRequest} from '../actions/login';
class LoginScreen extends React.Component {

    constructor() {


        super();
        this.login = this.login.bind(this);
    }

    login() {

        this.props.dispatch(loginRequest("dario.guarracino2@gmail.com","blabla"));
    }
    render() {

        const {navigation} = this.props;
        return (

            <View style={styles.container}>
             <Image
                 source={require('../commonicons/SpotInIcon.png')}
                 style={{marginTop: 20}}
                  />
              <View style={styles.middleContainerStyle}>
                <View style={styles.TextInputStyle}>
                 <Icon
                    name= 'account'
                    size={24}
                    style={{padding:3, alignItems: 'flex-start'}}
                 />
                 <TextInput
                   style={{height: 35}}
                   placeholder="Email"
                   onChangeText={(text) => this.setState({text})}
                  />
                </View>
                <View style={styles.TextInputStyle}>
                 <Icon
                    name= 'key-variant'
                    size={24}
                    style={{padding:3, alignItems: 'flex-start'}}
                 />
                 <TextInput
                   style={{height: 35}}
                   placeholder="password"
                   onChangeText={(text) => this.setState({text})}
                  />
                </View>
                <Button
                 title='Sign In'
                 textStyle={{ color: '#262626' }}
                 onPress={ this.login }
                 buttonStyle={{
                   height: 43,
                   width: 294,
                   borderRadius: 8,
                   backgroundColor: '#7ECB20',
                   marginTop: 25,
                 }}
                />
                <Button
                 title='Sign in with Facebook'
                 icon={
                    <Icon
                      name='facebook'
                      size={24}
                      color='white'
                    />
                 }
                 buttonStyle={{
                   height: 43,
                   width: 294,
                   borderRadius: 8,
                   backgroundColor: '#3F51B5',
                   marginTop: 8,
                 }}
                />
                <Button
                  title='Forgot your password?'
                  textStyle={{ color: '#424242' }}
                  buttonStyle={{
                    height: 43,
                    width: 294,
                    marginTop: 20,
                    backgroundColor: '#B2FF59',
                  }}
                />
              </View>
              <Button
                title='Do not have an account? Create one'
                textStyle={{ color: '#424242', alignItems: 'flex-start' }}
                buttonStyle={{
                  height: 47,
                  width: 375,
                  justifyContent: 'flex-end',
                  marginTop: 20,
                  backgroundColor: '#7ECB20',
                }}
              />
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2FF59',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 667,
        width: 376,
    },
    TextInputStyle: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#7ECB20',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    middleContainerStyle: {
      backgroundColor: '#B2FF59',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
      height: 312,
      width: 310,
    },
});

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};
export default connect(mapStateToProps)(LoginScreen);
