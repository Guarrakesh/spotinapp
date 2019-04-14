import React from "react";
import { View, StyleSheet } from "react-native";
import { Touchable, Button, Typography } from "../../common";
import ReferenceField from "../../common/ReferenceField";
import Helpers from "../../../helpers";
import {Fonts} from "../../common/Fonts";
import themes from "../../../styleTheme";

const PendingReviewsListItem = (props) => {

  const { onReservePress, reservation, t } = props;
  const { broadcast } = reservation;

  return (

    <ReferenceField source="business" record={broadcast} resource="businesses" reference="businesses">
      {({record: business}) =>
        <ReferenceField source="event" filter={{include_past_events: 1}} record={broadcast} resource="events" reference="events">
          {({record: event}) =>
            <View style={styles.container}>
              <View style={styles.broadcastInfoView}>
                <Typography style={styles.eventNameText}>{event.name}</Typography>
                <Typography style={styles.businessNameText}>{business.name}</Typography>
                <Typography style={styles.eventDate}>{Helpers.formattedEventDate(event.start_at, "D MMMM ["+ t('common.at') +"] HH:mm")}</Typography>
              </View>
              <View>
                <Button onPress={onReservePress} variant={"primary"} round title={"Recensisci".toUpperCase()}/>
              </View>
            </View>
          }
        </ReferenceField>
      }
    </ReferenceField>
  )
};

const styles = StyleSheet.create ({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderBottomColor: themes.base.colors.white.divisor,
    borderBottomWidth: 1
  },
  broadcastInfoView: {
    flex: 1
  },
  eventNameText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 16
  },
  businessNameText: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5
  },
  eventDate: {
    fontFamily: Fonts.LatoLight,
    fontSize: 12
  }
});

export default PendingReviewsListItem;