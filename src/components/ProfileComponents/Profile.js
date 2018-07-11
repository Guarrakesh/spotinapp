import React from 'react';
import { userLogout } from '../../actions/login';
import {
    View,
    Text,
    Button
} from 'react-native';

export default class Profile extends React.Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.navigation.dispatch(userLogout());
    }
    render() {
        return (
            <View>
                <Button title="Logout" onPress={this.handleLogout}/>
            </View>

        )
    }
}

