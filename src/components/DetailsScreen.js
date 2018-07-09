import React from 'react';

export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <Image source={require('../../BarIcons/NewsIcon.png')} style={{height: 25, width: 25}}/>
      </View>
    );
  }
}
