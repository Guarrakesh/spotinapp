import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    View,
    Text,
    Image,
    StyleSheet,
    ActivityIndicator


} from 'react-native';

import { Animated } from 'react-native';

import { Input, Button } from 'react-native-elements';
import themes from '../styleTheme';

const colors = themes.base.colors;

import {loginRequest} from '../actions/login';
class LoginScreen extends React.Component {

    constructor() {


        super();
        this.state = {
            username: "",
            password: ""
        };

        this.login = this.login.bind(this);
    }

    login() {
        if (this.state.username == "" || this.state.password == "")
            return;


        this.props.dispatch(loginRequest(this.state.username,this.state.password));
    }
    render() {

        const {navigation} = this.props;


        return (

            <View style={styles.container}>
                <Image
                    source={require('../images/SpotInIcon.png')}
                    style={{marginTop: 20, alignSelf: 'center'}}
                />
                <View style={styles.middleContainerStyle}>
                    <Input
                        placeholder="username"
                        leftIcon={<Icon name="user" color={colors.text.default} size={21}/>}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        containerStyle={styles.inputOuterContainer}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}
                        autoCapitalize="none"
                        shake={true}
                        onChangeText={(text) => this.setState({username: text})}
                        onSubmitEditing={() => {this.refs.password.focus()}}

                    />
                    <Input
                        placeholder="password"
                        ref="password"
                        leftIcon={<Icon name="key" color={colors.text.default} size={21}/>}
                        containerStyle={styles.inputOuterContainer}
                        leftIconContainerStyle={{width: 21, height: 21, marginLeft: 0}}
                        inputContainerStyle={{borderBottomWidth: 0}}
                        inputStyle={styles.textInputStyle}
                        errorMessage={this.props.auth.error && this.props.auth.error.message}
                        shake={true}
                        onChangeText={(text) => this.setState({password: text})}
                        secureTextEntry={true}
                        onSubmitEditing={this.login}
                        blurOnSubmit={true}
                    />

                    <Button
                        disabled={this.state.username == "" || this.state.password == ""}
                        disabledStyle={{opacity: 0.8}}
                        title='Sign In'
                        onPress={ this.login }
                        buttonStyle={styles.signInButton}
                        titleStyle={{color: colors.text.dark, fontSize: 16}}
                        icon={<ActivityIndicator style={{position: 'absolute', left: 10}} animating={this.props.auth.currentlySending} hidesWhenStopped={true} size="small" color="#0000ff" />}


                    />
                    <Button
                        titleStyle={{color: colors.white.default, fontSize: 16}}
                        title='Sign in with Facebook'
                        buttonStyle={styles.fbSignInButton}
                        icon={<Icon
                                      name='facebook'
                                      size={18}
                                      color='white'
                                />
                         }
                        iconContainerStyle={{alignSelf: 'flex-start'}}
                    />


                    <Button
                        title='Forgot your password?'
                        titleStyle={{ color: colors.text.default, fontSize: 16 }}
                        buttonStyle={{marginTop: 20, backgroundColor: 'transparent'}}

                    />
                </View>
                <Button
                    title={['Do not have an account? ', <Text style={{fontWeight: '700'}}>Create one</Text>]}
                    titleStyle={{ color: colors.white.dark, fontSize: 14}}
                    buttonStyle={styles.signUpButton}
                    />
            </View>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,

        alignItems: 'stretch',
        backgroundColor: colors.primary.default,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',

    },
    inputOuterContainer: {
        width:'100%',
        borderWidth: 0,
        marginBottom: 26
    },

    textInputStyle: {
        paddingBottom: 8,
        fontWeight: '300',
        borderBottomWidth: 1,
        borderBottomColor: colors.text.default,

    },
    middleContainerStyle: {
        width: '80%',
        backgroundColor: '#B2FF59',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'center',
        flexDirection: 'column',
    },
    signInButton: {
        position: 'relative',
        borderRadius: 4,
        backgroundColor: colors.primary.dark,
        marginTop: 8,
        height: 43,
        justifyContent: 'center',

    },
    fbSignInButton: {
        borderRadius: 4,
        backgroundColor: themes.commonColors.facebook,
        marginTop: 8,
        height: 43,
    },
    signUpButton: {

        //marginTop: 20,
        backgroundColor: colors.primary.dark,
        height: 47,

        width: '100%',
        borderRadius: 0
    }
});

const mapStateToProps = (state) => {
    return ({
        auth: state.auth
    });
};
export default connect(mapStateToProps)(LoginScreen);
