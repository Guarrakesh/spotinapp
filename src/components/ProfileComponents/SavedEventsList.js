import React from "react";
import PropTypes from "prop-types";
import {FlatList, StyleSheet, Text} from "react-native";
import {withNamespaces} from 'react-i18next';

import {View} from "../../components/common";
import themes from "../../styleTheme";
import SavedEventListItem from "./SavedEventListItem";


const SavedEventsList = ({
    ids,
    data,
    isLoading,
    onItemPress,
    onItemRemovePress,
    t,
    ...rest,
}) => {

  const emptyComponent = null;

  return (
      ids.length === 0 ? emptyComponent :
          <View>
            <Text style={themes.base.inlineListTitleStyle}>{t("profile.favoriteEvents")}</Text>
         {/*   <Typography  style={{marginLeft: 8}}  variant="caption">{t("common.longPressToRemove")} </Typography>*/}

            <View style={styles.container} elevation={2}>
              <FlatList
                  data={ids}
                  renderItem={({item}) =>
              <SavedEventListItem
                t={t}
                onPress={() => onItemPress(item, data[item])}
                onRemovePress={() => onItemRemovePress(item)}
                event={data[item]}/>
            }
                  {...rest}
              />

            </View>
          </View>
  )
};


const styles = StyleSheet.create({

  container: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    margin: 8
  },
  emptyComponentView: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'column'
  },
  emptyComponentText: {
    fontSize: 14,
    fontFamily: themes.base.fonts.LatoMedium,
    padding: 8,
  },
  listHeader: {
    padding: 8,

    fontSize: 16,
    fontFamily: themes.base.fonts.LatoBold,

  }

});

SavedEventsList.propTypes = {
  ids: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  onItemPress: PropTypes.func,
  onItemRemovePress: PropTypes.func,

};

export default withNamespaces()(SavedEventsList);