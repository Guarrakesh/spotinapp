import React from 'react';

import BusinessCard from './BusinessCard';
import {ActivityIndicator, FlatList, View, Text} from 'react-native';
import i18n from "../../i18n/i18n";
import PropTypes from 'prop-types';
import themes from "../../styleTheme";
//import broadcasts from "../../api/broadcasts";


//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BusinessList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id, distance) => {
    //cerco tra i businesses quale ha l'id uguale a _id
    this.props.onItemPress(id, distance);
  };

  render(){
    const {
        isLoading,
        data,
        ids,
      //  refresh,
      //  isRefreshing,
      //  onMapPress,
      //  onItemPress,
      //  onFavoritePress,
        searchActive,
        style,
        ...rest} = this.props;

    if(isLoading){
      return(
          <View style={[{flex: 1, justifyContent: 'center'}]}>
            <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
          </View>
      )
    }
    if (searchActive && ids.length === 0) {
      return (
          <View style={themes.base.noContentView}>
            <Text style={themes.base.noContentText}>{i18n.t("common.noBusinesses")}</Text>
          </View>
      )
    }

    return (

        <FlatList
            {...rest}
            style={[style]}
            contentContainerStyle={{paddingBottom: 85}}
            data={ids}
            initialNumToRender={20}
            renderItem={({item}) => <BusinessCard
                business={data[item]}
                onPress={() => this._onItemPress(item, data[item].dist)}
            />}
        />

    );
  }

};

BusinessList.propTypes = {
  searchActive: PropTypes.bool,
  onItemPress: PropTypes.func.isRequired,
  broadcasts: PropTypes.array,
};


export default BusinessList;
