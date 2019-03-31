import React from "react";
import {FlatList, StyleSheet, Text} from "react-native";
import { View } from "../../common";
import { withNamespaces } from "react-i18next";
import themes from "../../../styleTheme";
import PendingReviewsListItem from "./PendingReviewsListItem"

const PendingReviewsList = ({
                              ids,
                              data,
                              isLoading,
                              onItemPress,
                              t,
                              ...rest
                            }) => {



  const passedReservations = ids.filter(function(item) {
    //Ritorna le prenotazioni il cui evento è finito da 3 ore
    const expiredDate = new Date(data[item].start_at).getTime() + (3*3600000);
    return ((expiredDate < Date.now()) && !data[item].review);
  });


  return(
    passedReservations.length === 0 ? null :
      <View>
        <Text style={themes.base.inlineListTitleStyle}>{t("profile.reservations.tellUs")}</Text>
        <View style={styles.container} elevation={2}>
          <FlatList
            data={passedReservations}
            renderItem={({item}) =>
              <PendingReviewsListItem
                reservation={data[item]}
                onReservePress={() => onItemPress(data[item])}
                t={t}
              />
            }
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
});

export default withNamespaces()(PendingReviewsList);