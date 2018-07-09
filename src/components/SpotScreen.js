
import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button

} from 'react-native'
class SpotScreen extends React.Component {
    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* other code from before here */}
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SpotScreen);
