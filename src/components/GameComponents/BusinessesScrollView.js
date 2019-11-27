import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, TouchableHighlight} from "react-native";
import { View, Touchable, Typography } from "../common";
import ListController from "../../controllers/ListController";
import {moderateScale} from "react-native-size-matters";
import themes from "../../newTheme";

const BusinessesScrollView = (props) => {

  const { onItemPress } = props;

  const itemView = (item) => {
    return(
      <TouchableHighlight
        style={styles.itemContainer}
        underlayColor={themes.base.colors.accent.default}
        onPress={() => onItemPress(item)}>
        <Typography style={styles.itemText}>{item.name} - {item.address.city} {item.address.zip}</Typography>
      </TouchableHighlight>
    )
  };

  return (
    <View style={{flex: 1}}>
      <ListController
        id={'business_request_list'}
        resource={"businesses"}
        perPage={"100"}
        sort={{field: 'dist.calculated', order: 'asc'}}
        //nearPosition={nearPosition}
        filterDefaultValues={undefined}
      >
        {controllerProps => {
          const { ids, data, isLoading } = controllerProps;

          if(isLoading) {
            return (
              <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                  color={themes.base.colors.accent.default}
                  size={"small"}
                />
              </View>

            )
          }
          else {
            return (
              <ScrollView style={styles.container}>
                { ids.map((item) => itemView(data[item])) }
              </ScrollView>
            )
          }
        }}
      </ListController>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    paddingTop: moderateScale(3),
    paddingBottom: moderateScale(3),
    paddingLeft: moderateScale(16),
    paddingRight: moderateScale(16),
  },
  itemText: {
    color: themes.base.colors.white.light
  },
  activityIndicatorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BusinessesScrollView;
