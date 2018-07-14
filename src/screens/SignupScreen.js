import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {

    Text,
    Image,
    StyleSheet,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import View  from '../components/common/View';


import { Animated } from 'react-native';

import { Input, Button } from 'react-native-elements';
import themes from '../styleTheme';

const colors = themes.base.colors;

import {loginRequest} from '../actions/login';

import { Transition } from 'react-navigation-fluid-transitions';
class SignupScreen extends React.Component {

    constructor() {


        super();
        this.state = {
            username: "",
            password: ""
        };

        // this.login = this.login.bind(this);
    }

    /* login() {
     if (this.state.username == "" || this.state.password == "")
     return;


     this.props.dispatch(loginRequest(this.state.username,this.state.password));
     }*/
    render() {

        const {navigation} = this.props;


        return (
            <Transition shared="middleContainer">
                <View style={styles.container}>

                    <Input
                        placeholder="Fullname"
                        ref="password"

                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}

                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}

                        onSubmitEditing={this.login}
                        blurOnSubmit={true}
                    />
                    <Input
                        placeholder="Username"
                        ref="username"
                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}

                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}


                        blurOnSubmit={true}
                    />
                    <Input
                        placeholder="Email"
                        ref="email"
                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}

                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}


                        blurOnSubmit={true}
                    />
                    <Input
                        placeholder="Password"
                        ref="password"
                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}

                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}

                        blurOnSubmit={true}
                    />
                    <Input
                        placeholder="Confirm password"
                        ref="passwordConfirm"
                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}
                        errorMessage={this.props.auth.error != null ? this.props.auth.error.message : ""}
                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}

                        blurOnSubmit={true}
                    />
                    <Transition shared="signupButton">
                        <Button
                            title='Sign Up'
                            titleStyle={{ color: colors.accent.default, fontSize: 14}}
                            buttonStyle={styles.signUpButton}
                        />
                    </Transition>

                </View>
            </Transition>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: colors.primary.default,
        flexDirection: 'column',

        padding: 35,
        height: '100%',
        width: '100%',

    },
    inputOuterContainer: {
        width:'100%',
        borderWidth: 0,
        marginBottom: 26
    },

    textInputStyle: {
        paddingBottom: 8,
        fontWeight: '500',
        borderBottomWidth: 1,
        borderBottomColor: colors.text.light,
        color: colors.text.light,
        marginLeft:0,

    },
    signUpButton: {

        //marginTop: 20,
        backgroundColor: colors.white.light,
        height: 47,

        width: '100%',
        borderRadius: 100,
        marginTop: 32,
        borderWidth: 1,
        borderColor: colors.accent.default,
        flexGrow: 5,
        alignSelf: 'flex-end'
    }
});

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};
export default connect(mapStateToProps)(SignupScreen);
