import React from 'react';
import { connect } from 'react-redux';

import SignupForm from '../components/forms/SignupForm';
import signup from '../validations/signup';
import validate from 'validate.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import {

    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    ImageBackground,
    Platform,
    StatusBar
} from 'react-native';



import { Animated } from 'react-native';



import themes from '../styleTheme';
const colors = themes.base.colors;

import {registerRequest} from '../actions/login';


class SignupScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            name: "",
            password: "",
            email: "",
            errors: {}

        };

        this.register = this.register.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangePassConfirm = this.onChangePassConfirm.bind(this);
    }

    onChangeEmail(text) {
        this.setState({email: text});
    }
    onChangeName(text) {
        this.setState({name: text});
    }
    onChangePass(text) {
        this.setState({password: text});
    }
    onChangePassConfirm(text) {
        this.setState({passwordConfirm: text});
    }


    register() {


        const {email, password, name, passwordConfirm} = this.state;
        this.setState({errors: {}});

        const validationErrors = validate({
            name: name,
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }, signup);


        if (validationErrors) {
            this.setState({errors: validationErrors});
        } else {
            this.props.dispatch(registerRequest(email, password, name));
        }

        console.log(this.state.errors);
    }
    render() {
        //Eventuali errori dati dal server (email già esistente o altri)
        //Sono diversi da quelli in this.state.errors, quelli sono errori di convalida fatti lato client
        const { error } = this.props.auth;
        let usedEmailMessage = false;
        console.log("error is", error);
        if (error && error.code == 409) {
            //L'email esiste già
            usedEmailMessage = "Questa email è già stata usata";

        }
        // TODO: Gestire tutti gli eventuali errori del server (per ora gestiamo solo il Conflict: Email già esistente)
        return (
            <ImageBackground source={require('../images/loginBg1.jpg')} blurRadius={ Platform.OS == "ios" ? 10 : 5} style={{width: '100%', height: '100%'}}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true}/>
            <View style={styles.container}>

            <SignupForm
                onChangeTextName={this.onChangeName}
                onChangeTextPassword={this.onChangePass}
                onChangeTextEmail={this.onChangeEmail}
                onChangeTextPasswordConfirm={this.onChangePassConfirm}
                emailError={this.state.errors.email ? this.state.errors.email[0] : usedEmailMessage}
                nameError={this.state.errors.name ? this.state.errors.name[0] : ""}
                passwordError={this.state.errors.password ? this.state.errors.password[0] : ""}
                passConfirmError={this.state.errors.passwordConfirm ? this.state.errors.passwordConfirm[0]: ""}
                onSubmit={this.register}
            />

            </View>
            </ImageBackground>

        )
    }
}








const styles = StyleSheet.create({
    container: {
        flex:1,

        flexDirection: 'column',

        padding: 35,
        marginTop: 100,
        height: '100%',
        width: '100%',

    },

});

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};
export default connect(mapStateToProps)(SignupScreen);
