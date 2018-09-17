import React from 'react';

import BusinessCard from './BusinessCard';
import {StyleSheet, FlatList} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';
//import broadcasts from "../../api/broadcasts";


//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BusinessList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id) => {
    const business = this.props.businesses.find(business => business._id === id);

    //cerco tra i businesses quale ha l'id uguale a _id
    this.props.onItemPress(business);
  }

  render(){

    const { businesses } = this.props;
    if (!businesses || businesses.length <= 0) {
      return null;
    }


    return (
      <FlatList
        data={businesses}
        renderItem={({item}) => <BusinessCard
          business={item}
          onItemPress={this._onItemPress.bind(item._id)}
        />}

        contentContainerStyle={styles.container}
      />

    );
  }

};

BusinessList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  broadcasts: PropTypes.array,
};
const styles = StyleSheet.create({
  container: {


    alignItems: 'stretch',
    padding: 8,
  }
});

export default BusinessList;
