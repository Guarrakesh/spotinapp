import React from "react";
import PropTypes from "prop-types";
import View from "../../components/common/View";
import {Text, Image, FlatList, StyleSheet} from "react-native";
import themes from "../../styleTheme";
import SavedEventListItem from "./SavedEventListItem";
import Button from '../common/Button';


const SavedEventsList = ({
    ids,
    data,
    isLoading,
    onItemPress,
    onItemRemovePress,
    ...rest,
}) => {

  const emptyComponent = null;

  return (
      ids.length === 0 ? emptyComponent :
      <View style={styles.container} elevation={2}>
        <FlatList
            data={ids}
            ListHeaderComponent={
              <Text style={styles.listHeader}>Eventi preferiti</Text>
              }
            renderItem={({item}) =>
                <SavedEventListItem
                    onPress={() => onItemPress(item, data[item])}
                    onRemovePress={() => onItemRemovePress(item)}
                    event={data[item]}/>
            }
            {...rest}
        />

      </View>
  )
}


const styles = StyleSheet.create({

  container: {
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8
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

export default SavedEventsList;