import React from 'react';
import Images from '../assets/images';

export default class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
        <Image source={Images.icons.barIcons.news} style={{height: 25, width: 25}}/>
      </View>
    );
  }
}
