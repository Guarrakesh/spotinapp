import React from 'react';

import BusinessCard from './BusinessCard';
import {ActivityIndicator, FlatList, View} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';
import themes from "../../styleTheme";
//import broadcasts from "../../api/broadcasts";


//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BusinessList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id, distance) => {
    //cerco tra i businesses quale ha l'id uguale a _id
    this.props.onItemPress(id, distance);
  }

  render(){
    const {
      isLoading,
      data,
      ids,
      refresh,
      isRefreshing,
      onMapPress,
      onItemPress,
      onFavoritePress,
      style,
      ...rest} = this.props;

    if(isLoading){
      return(
        <View style={[{flex: 1, justifyContent: 'center'}]}>
          <ActivityIndicator size="large" color={themes.base.colors.text.default}/>
        </View>
      )
    }

    return (

      <FlatList
        {...rest}
          style={[style]}
        data={ids}
        renderItem={({item}) => <BusinessCard
          business={data[item]}
          onPress={() => this._onItemPress(item, data[item].dist)}
        />}
      />

    );
  }

};

BusinessList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  broadcasts: PropTypes.array,
};


export default BusinessList;
