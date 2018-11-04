import React from "react";
import View from "../common/View";
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from "react-native";
import PropTypes from "prop-types";
import themes from "../../styleTheme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReferenceField from "../common/ReferenceField";
import Helpers from "../../helpers/index";
import {Fonts} from "../common/Fonts";
import {VersionedImageField} from "../common";
import {withNamespaces} from "react-i18next";


const fonts = themes.base.fonts;
const colors = themes.base.colors;

const BroadcastFloatingCard = ({
    broadcast,
    onPress,
    dark,
    elevation,
    showEvent,
    overlayOpacity = 1,
    titleStyle,
    t
}) => {

  const { business, offer, dist, newsfeed } = broadcast;
  let roundedDistance = Math.round(dist.calculated*10)/10;
  roundedDistance = roundedDistance.toString().replace(".",",");

  const discount = (type) => {
    switch (parseInt(type)) {
      case 0:
        return `${offer.value}€`;
      case 1:
        return `-${offer.value}%`;
      case 2:
        return `-${offer.value}€`;
      default:
        return null;
    }
  };

  const businessInfoComponent = (business) => (
      <View style={styles.businessContainer}>
        <Text style={styles.businessName} numberOfLines={1} adjustsFontSizeToFit={true}>{business.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.businessType} numberOfLines={1} adjustsFontSizeToFit={true}>{business.type.join(' • ')}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="map-marker-radius" color={colors.white.light} size={18}/>
            <Text style={styles.businessDistance} numberOfLines={1} adjustsFontSizeToFit={true}>{roundedDistance} km</Text>
          </View>
        </View>
      </View>);

  return (
      <View style={styles.outerContainer} elevation={2}>
        <TouchableOpacity onPress={onPress} delayPressIn={50}>
          <ReferenceField reference="businesses" source="business" record={broadcast}>
            { ({record: business}) =>
                <View style={{borderRadius: themes.base.borderRadius, overflow: 'hidden'}}>
                  <View>
                    { business.cover_versions && business.cover_versions.length > 0 ?
                        <VersionedImageField
                            isBackground
                            minSize={{width: 550, height: 150}}
                            imgSize={{width: 550, height: 150}}
                            style={styles.imgBackground}
                            source={business.cover_versions}>
                          {businessInfoComponent(business)}
                        </VersionedImageField>
                        :<ImageBackground style={{width: 350, height: 150}} source={{uri:  "https://via.placeholder.com/350x150"}}>
                      {businessInfoComponent(business)}
                    </ImageBackground>}

                  </View>
                  <View>
                    {showEvent ?
                        <ReferenceField reference="events" record={broadcast} source="event">
                          {({record: event}) => (
                              <View style={styles.eventInfoView}>
                                <View style={{flex: 1}}>
                                  <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name}</Text>
                                  <Text
                                      style={styles.eventDate}>{Helpers.formattedEventDate(event.start_at, "D MMM • HH:mm")}</Text>
                                </View>

                                <View>
                                  {<VersionedImageField source={event.competition.image_versions} minSize={{width: 128, height: 128}}
                                                        imgSize={{width: 48, height: 48}}/>}
                                </View>

                              </View>
                          )
                          }

                        </ReferenceField> : null
                    }
                  </View>
                  <View style={styles.offerView}>
                    <Text style={styles.offerTitle} numberOfLines={1} adjustsFontSizeToFit={true}>
                      {(newsfeed == 0 || !offer.title || offer.title === "") ? t("common.discountAtCheckout") : offer.title}</Text>
                    <Text style={styles.offerValue}>{discount(offer.type)}</Text>
                  </View>
                </View>
            }
          </ReferenceField>
        </TouchableOpacity>
      </View>

  );
};

BroadcastFloatingCard.defaultProps = {
  titleStyle: {}
};

BroadcastFloatingCard.propTyeps = {
  onPress: PropTypes.func,
  broadcast: PropTypes.object,
  dark: PropTypes.bool,
  elevation: PropTypes.number,

  //styles
  titleStile: PropTypes.object
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: themes.base.colors.white.light,
    flexDirection: 'column',
    justifyContent: 'center',
    //I padding servono per dare spazio all'ombra
    margin: 8,
    borderRadius: 8
  },
  businessContainer: {
    width: '100%',
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  businessName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 20,
    color: colors.white.light,
  },
  businessType: {
    flex: 1,
    fontFamily: Fonts.LatoLight,
    fontSize: 16,
    color: themes.base.colors.white.light
  },
  businessDistance: {
    fontSize: 18,
    fontFamily: fonts.LatoMedium,
    color: colors.white.light,
  },
  imgBackground: {
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 100,
  },
  eventInfoView: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.white.divisor,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center'
  },
  eventName: {
    fontSize: 20,
    fontFamily: Fonts.LatoBold,
    color: colors.text.default
  },
  eventDate: {
    fontFamily: fonts.LatoLight,
    color: colors.text.default,
    fontSize: 18,
    textTransform: 'capitalize'
  },
  offerView: {
    flexDirection: 'row',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
    backgroundColor: colors.white.light
  },
  offerTitle: {
    fontSize: 18,
    fontFamily: Fonts.LatoMedium,
    color: colors.text.default,
    flex: 1,
    marginRight: 5
  },
  offerValue: {
    fontSize: 24,
    color: colors.danger.default,
    fontFamily: fonts.LatoMedium,
    textAlign: 'center'
  }
});

export default withNamespaces()(BroadcastFloatingCard);
