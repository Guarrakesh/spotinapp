import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'react-native-elements';
import {
    View,
    Text,

    StyleSheet,

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
                <Text>{this.props.auth.error  ? "C'è stato un errore" : ""}</Text>
                <Text>{this.props.auth.currentlySending ? "LOADING": "NOT LOADING"}</Text>
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

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};
export default connect(mapStateToProps)(LoginScreen);

