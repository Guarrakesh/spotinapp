import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, View, StyleSheet, ActivityIndicator, Image, Linking} from 'react-native';
import { withNamespaces } from 'react-i18next';
import {Button, Typography} from '../common';
import CompetitionCard from './CompetitionCard';
import themes from '../../styleTheme';
import {Fonts} from "../common/Fonts";

import Images from '../../assets/images';
const CompetitionList = ({
                           isLoading,
                           data,
                           ids,
                           refresh,
                           isRefreshing,
                           onItemPress,
                           onContactUsPress,
                           noContent,
                           t
                         }) => {


  const handlePress = (id, name) => {
    this.requestAnimationFrame(() => {
      onItemPress(id, name);

    });

  };

  const renderItem = ({item, index}) => {
    const competition = data[item] || {};

    return (<CompetitionCard
      key={item}
      animate
      index={index}
      onPress={() => handlePress(item, competition.name)}
      {...competition} />)
  };

  const keyExtractor = (item) => item._id;
  const itemLayout = (data, index) => (
    {length: 100, offset: (100+8)* index, index}
  );

  if (isLoading) {
    return (
      <View style={styles.noContentView}>
        <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
      </View>
    )
  }

  if (noContent) {
    return (
      <View style={styles.noContentView}>
        <Image source={Images.icons.common.notFound}/>
        <Typography  style={{margin: 8, color: '000',fontWeight: '900'}}
                     uppercase >
          {t("browse.noCompetitions")}
        </Typography>
        <View style={styles.noFoundView}>
          <Typography variant="body" gutterBottom align={"center"}>{t("browse.noFoundEvent")}</Typography>
          <Button
            containerStyle={{marginBottom: 8}}
            variant="primary"
            onPress={() => onContactUsPress()}
            round
            uppercase>{t("browse.noBroadcasts.contactUs")}</Button>
        </View>
      </View>
    )
  }

  const footer = () => {
    if(isLoading){
      return (
        <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
      )
    }
    else if(ids.length > 0 && !isLoading) {
      return (
        <View style={styles.noFoundView}>
          <Typography variant="body" gutterBottom align={"center"}>{t("browse.noFoundCompetition")}</Typography>
          <Button
            containerStyle={{marginBottom: 8}}
            variant="primary"
            onPress={() => onContactUsPress()}
            round
            uppercase>{t("browse.noBroadcasts.contactUs")}</Button>
        </View>
      )
    }
    else {
      return null;
    }
  };

  return (

    <FlatList
      ListHeaderComponent={
        <Typography
          style={{margin: 8, color: '000',fontWeight: '900'}}
          align="center"
          uppercase gutterBottom
        >{t("browse.selectCompetition")}</Typography>}
      contentContainerStyle={styles.container}
      data={ids}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={refresh}
      getItemLayout={itemLayout.bind(this)}
      ListFooterComponent={footer()}
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
  noFoundView: {
    padding: 8,
    alignItems: "center",
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    margin: 16,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: themes.base.colors.white.divisor
  }
});


export default withNamespaces()(CompetitionList);
