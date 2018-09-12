import React from 'react';

import BroadcastCard from './BroadcastCard';
import {StyleSheet, FlatList} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';
//import broadcasts from "../../api/broadcasts";


//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BroadcastsList extends React.Component {

  _keyExtractor = (item) => item._id;

  _onItemPress = (id) => {
    const broadcast = this.props.broadcasts.find(broadcast => broadcast._id === id);

    //cerco tra i businesses quale ha l'id uguale a _id
    this.props.onItemPress(broadcast);
  }

  render(){

    const { broadcasts } = this.props;
    if (!broadcasts || broadcasts.length <= 0) {
      return null;
    }


    return (
      <FlatList
        data={broadcasts}
        renderItem={({item}) => <BroadcastCard
          onItemPress={() => this._onItemPress(item._id)}
          {...item}/>}

        contentContainerStyle={styles.container}
      />

    );
  }

};

BroadcastsList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  broadcasts: PropTypes.array,
};
const styles = StyleSheet.create({
  container: {


    alignItems: 'stretch',
    padding: 8,
  }
});

export default BroadcastsList;
