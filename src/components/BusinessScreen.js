import React from 'react';

import View from '../components/common/View';
import { SearchBar } from 'react-native-elements';
import DetailsScreen from './DetailsScreen';

class BusinessScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <SearchBar
          round={true}
          placeholder='Cerca Locale'
          lightTheme={true}
          clearIcon={{ color: 'white' }}
        />
      </View>
    );
  }
}

export default BusinessScreen;
