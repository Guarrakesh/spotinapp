import React from 'react';
import PropTypes from 'prop-types';

import CompetitionCard from './CompetitionCard';
import {FlatList, View, StyleSheet, Text} from 'react-native';



const CompetitionList = (props) => {

  const { competitions, onItemPress, refreshing, onRefresh} = props;
  if (competitions.length <= 0) {
    return null;
  }

  const handlePress = id => {
    this.requestAnimationFrame(() => {
        const comp = competitions.find(comp => comp._id === id);
        onItemPress(comp);

    });

  }
  const renderItem = ({item}) => (
      <CompetitionCard
          key={item._id}
          onPress={() => handlePress(item._id)}
          {...item} />
  );

  const keyExtractor = (item) => item._id;
  const itemLayout = (data, index) => (
      {length: 100, offset: (100+8)* index, index}
  );

  return (

      <FlatList
          ListHeaderComponent={ <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona la competizione</Text>}
        contentContainerStyle={styles.container}
        data={competitions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={refreshing}
        onRefresh={onRefresh}
        getItemLayout={itemLayout.bind(this)}
      />

  );

};

CompetitionList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 8,
  }
});


CompetitionList.propTypes = {
    competitions: PropTypes.array,
    onItemPress: PropTypes.func,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func,
};
export default CompetitionList;
