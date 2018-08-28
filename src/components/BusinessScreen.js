
import React from 'react';

import {View, Button} from 'react-native';
import DetailsScreen from './DetailsScreen';

class BusinessScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* other code from before here */}
        <Button
          title="Business Screen"
          onPress={() => this.props.navigation.navigate({DetailsScreen})}
        />
      </View>
    );
  }
}

export default BusinessScreen;
