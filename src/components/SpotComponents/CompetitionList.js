import React from 'react';
import PropTypes from 'prop-types';

import CompetitionCard from './CompetitionCard';
import {FlatList, View, StyleSheet, Text, ActivityIndicator} from 'react-native';

import themes from '../../styleTheme';

const CompetitionList = ({
    isLoading,
    data,
    ids,
    refresh,
    isRefreshing,
    onItemPress
}) => {


  const handlePress = (id, name) => {
    this.requestAnimationFrame(() => {
      onItemPress(id, name);

    });

  };

  const renderItem = ({item}) => {
    const competition = data[item] || {};

    return (<CompetitionCard
        key={item}
        onPress={() => handlePress(item, competition.name)}
        {...competition} />)
  }

  const keyExtractor = (item) => item._id;
  const itemLayout = (data, index) => (
      {length: 100, offset: (100+8)* index, index}
  );

  if (isLoading) {
    return (
      <View style={styles.noContentView}>
        <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
      </View>
    )
  }

  if (!isRefreshing && !isLoading && ids.length === 0 ) {
    return (<View style={themes.base.noContentView}>
      <Text>Non ci sono competizioni</Text>
    </View>)
  }
  return (

      <FlatList
          ListHeaderComponent={ <Text style={themes.base.listTitleStyle}>Seleziona la competizione</Text>}
          contentContainerStyle={styles.container}
          data={ids}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          refreshing={isRefreshing}
          onRefresh={refresh}
          getItemLayout={itemLayout.bind(this)}
      />

  );

};

CompetitionList.propTypes = {
  onItemPress: PropTypes.func.isRequired,

  //Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,
  refresh: PropTypes.func,
  isRefreshing: PropTypes.bool,

};
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 8,
  },
  noContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

});


export default CompetitionList;
