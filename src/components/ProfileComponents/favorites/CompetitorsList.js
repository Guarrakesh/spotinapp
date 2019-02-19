import React from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Col, Row, Grid } from 'react-native-easy-grid';
import CompetitorCard from "./CompetitorCard";
import { withNamespaces } from 'react-i18next';
import PropTypes from "prop-types";
import { Button, VersionedImageField, Typography } from "../../common/index";
import themes from "../../../styleTheme";
import {Fonts} from "../../common/Fonts";

const MAX_FAVCOMP_NUM = 3;

const CompetitorsList = ({
                           ids,
                           data,
                           onItemPress,
                           onConfirmPress,
                           selectedComp,
                           currentSport,
                           isLoading,
                           total,
                           version,
                           t
                         }) => {

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
      </View>
    );
  }

  if (ids.length === 0) {
    return(
      <View style={themes.base.noContentView}>
        <Text style={themes.base.noContentText}>{t("profile.settings.favorite.noTeamsFound")}</Text>
      </View>
    )
  }

  const rows = [...Array(Math.ceil(ids.length / 3))];

  const competitorsRows = rows.map( (row, idx)  => {
    return ids.slice(idx * 3, idx * 3 + 3);
  });

  const isSelected = (competitorId) => {
    for(let comp of selectedComp){
      if(comp._id === competitorId){
        return true;
      }
    }
    return false;
  };

  const numBySport = () => {
    let num = 0;
    for(let comp of selectedComp){
      if(comp.sport === currentSport){
        num++
      }
    }
    return num;
  };

  const isDisabled = (id) => numBySport() >= MAX_FAVCOMP_NUM && !isSelected(id);

  const content = competitorsRows.map((row, idx) => (
    <Row style={{height:150}} key={idx}>{

      row.map(id => <Col>
        {data[id] ?
          <CompetitorCard
            key={id}
            onPress={() => onItemPress(id, data[id].name)}
            icon={<VersionedImageField style={isDisabled(data[id]._id) ? styles.imgDisabled : null} source={data[id].image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 72, height: 72}}/>}
            isSelected={isSelected(data[id]._id)}
            isDisabled={isDisabled(data[id]._id)}
            data={data[id]}
            {...data[id]}/> : null
        }</Col>)
    }</Row>
  ));

  return(
    <View style={{flex:1}}>
      <ScrollView>
        <Typography
          style={{margin: 8}}
          variant="heading"  gutterBottom>
          {t("profile.settings.favorite.selectFavoriteCompetitors")}
        </Typography>
        <Grid>
          {content}
        </Grid>
      </ScrollView>
      <Button
        disabled={isLoading}
        onPress={() => onConfirmPress()}
        variant="primary"
        containerStyle={styles.confirmButton}
        titleStyle={styles.confirmButtonTitle}
        title={numBySport()>0 ? `${t("common.confirm").toUpperCase()} (${numBySport()})` : t("common.skip").toUpperCase()}
      />
    </View>
  );
};

CompetitorsList.propTypes = {

  onItemPress: PropTypes.func.isRequired,
  onConfirmPress: PropTypes.func.isRequired,
  // Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,

};

const styles = StyleSheet.create({

  imgDisabled: {
    opacity: 0.3
  },

  confirmButton: {
    position: 'absolute',
    flexDirection: "row",
    alignSelf: "center",
    height: 40,
    bottom: 8,
    borderRadius: 32,
    justifyContent: 'center',
  },
  confirmButtonTitle: {
    fontSize: 16,
    fontFamily: Fonts.LatoMedium
  },
  leftButton: {
    flex: 1
  },
  rightButton: {
    flex: 1
  }
});



export default withNamespaces()(CompetitorsList)