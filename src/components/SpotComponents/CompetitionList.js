import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, StyleSheet, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/Entypo";
import { withNamespaces } from 'react-i18next';
import { Typography } from '../common';
import CompetitionCard from './CompetitionCard';
import themes from '../../styleTheme';
import {Fonts} from "../common/Fonts";

const CompetitionList = ({
    isLoading,
    data,
    ids,
    refresh,
    isRefreshing,
    onItemPress,
    noContent,
    t
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
        <ActivityIndicator size="large" color={themes.base.colors.text.default} />
      </View>
    )
  }

  if (noContent) {
    return (
      <View style={styles.noContentView}>
        <Icon name={"emoji-sad"} size={100} style={{color: themes.base.colors.text.default}}/>
        <Text style={styles.noContentText}>
          {t("browse.noCompetitions")}
        </Text>
      </View>
    )
  }
  return (

      <FlatList
          ListHeaderComponent={ <Typography variant="heading"  gutterBottom
          style={themes.base.listTitleStyle}>{t("browse.selectCompetition")}</Typography>}
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
  ids: PropTypes.array,
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
    backgroundColor: themes.base.colors.white.default
  },
  noContentView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  noContentText: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 20,
    color: themes.base.colors.text.default
  },

});


export default withNamespaces()(CompetitionList);
