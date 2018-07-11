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
        return (
            <View>
                <Button title="Logout" onPress={this.handleLogout}/>
            </View>

        )
    }
}

const mapStateToProps = state => {
    return ({

    });
}

export default connect(mapStateToProps)(ProfileScreen);

