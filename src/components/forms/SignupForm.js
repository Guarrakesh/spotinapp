

import React from 'react';
import  View   from '../common/View';
import { Text } from 'react-native';
import {Input, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
const colors = themes.base.colors;

const SignupForm = props => {


    return (
        <View>
            <Input
                placeholder="Nome"
                id="name"
                containerStyle={styles.inputOuterContainer}
                leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}

                shake={true}
                onChangeText={props.onChangeTextName}
                errorMessage={<Text>{props.nameError || ""}</Text>}
                blurOnSubmit={true}
            />
            <Input
                placeholder="Email"

                id="email"

                containerStyle={styles.inputOuterContainer}
                leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                autoCapitalize="none"
                shake={true}
                onChangeText={props.onChangeTextEmail}
                errorMessage={<Text>{props.emailError || ""}</Text>}
                blurOnSubmit={true}
            />
            <Input
                placeholder="Password"

                id="password"
                containerStyle={styles.inputOuterContainer}
                leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                errorMessage={<Text>{props.passwordError || ""}</Text>}
                shake={true}
                onChangeText={props.onChangeTextPassword}
                secureTextEntry={true}

                blurOnSubmit={true}
            />
            <Input
                placeholder="Confirm password"
                id="passwordConfirm"

                containerStyle={styles.inputOuterContainer}
                leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                inputContainerStyle={{borderBottomWidth: 0}}
                inputStyle={styles.textInputStyle}
                errorMessage={<Text>{props.passConfirmError || "" }</Text>}
                shake={true}
                onChangeText={props.onChangeTextPasswordConfirm}
                secureTextEntry={true}

                blurOnSubmit={true}
            />

                <Button
                    title='Sign Up'
                    titleStyle={{ color: colors.white.default, fontSize: 14}}
                    buttonStyle={styles.signUpButton}
                    onPress={props.onSubmit}
                />


        </View>
    )
};

SignupForm.propTypes = {

    emailError: PropTypes.string,
    passwordError: PropTypes.string,
    nameError: PropTypes.string,
    passConfirmError: PropTypes.string,
    onChangeTextPasswordConfirm: PropTypes.func.isRequired,
    onChangeTextPassword: PropTypes.func.isRequired,
    onChangeTextName: PropTypes.func.isRequired,
    onChangeTextEmail: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};


const styles = {
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
        backgroundColor: colors.accent.default,
        height: 47,

        width: '100%',
        borderRadius: 100,
        marginTop: 32,


        flexGrow: 5,
        alignSelf: 'flex-end',
        ...themes.base.elevations.depth2,
    }
}
export default SignupForm;