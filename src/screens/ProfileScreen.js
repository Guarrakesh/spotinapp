import React from 'react';
import { userLogout } from '../actions/login';
import {
    View,
    Text,
    Button
} from 'react-native';

import { connect } from 'react-redux';
class ProfileScreen extends React.Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.dispatch(userLogout());
    }
    render() {
        const { loggedIn } = this.props.auth;

        return (
            <View>
                {loggedIn
                    ?  <Button title="Logout" onPress={this.handleLogout}/>
                    :  <Button title="Accedi" onPress={() => {this.props.navigation.navigate('SignIn')}}/>
                }


            </View>

        )
    }
}

const mapStateToProps = state => {
    return ({
        auth: state.auth
    });
}

export default connect(mapStateToProps)(ProfileScreen);

