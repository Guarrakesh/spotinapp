import React from 'react';

import { Button } from 'react-native-elements';
import {
    View,
    Text,

    StyleSheet,

} from 'react-native';

import {LOGIN} from '../actions/types';
class LoginScreen extends React.Component {

    constructor() {
        super();
        this.login = this.login.bind(this);
    }

    login() {

        this.props.navigation.dispatch({type: LOGIN.REQUEST, email: "dario.guarracino2@gmail.com", password: "blabla"});
    }
    render() {

        const {navigation} = this.props;
        return (

            <View style={styles.container}>

                <Button
                    buttonStyle={{backgroundColor: 'red'}}
                    onPress={this.login} title="Login"/>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#B2FF59'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});


export default LoginScreen;

