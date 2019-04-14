import React from 'react';
import { Image, Text, Dimensions, StyleSheet} from 'react-native';
import { Touchable, View } from '../common';
import moment from 'moment';
import 'moment/locale/it';
import * as Animatable from 'react-native-animatable';
import themes from '../../styleTheme';
import ReferenceField from '../common/ReferenceField'
import VersionedImageField from '../common/VersionedImageField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";


const colors = themes.base.colors;
const AnimatedView = Animatable.createAnimatableComponent(View);

const EventCard = (props) => {

  const { competition, competitors, index = 0 } = props;
  const competitorsComponent = (
      competition.competitorsHaveLogo
          ?
          <View style={styles.competitors}>
            {competitors.map(comp => (
                <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />
            ))}
          </View>
          :
          <View style={{marginTop: 16}}>
            { <VersionedImageField source={competition.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
          </View>
  );
  let date = moment(props.start_at).locale('it').format('D MMM - HH:mm').toUpperCase();
  const time = moment(props.start_at).locale('it').format('HH:mm').toUpperCase();

  return (


      <AnimatedView
          useNativeDriver={true}
          animation="fadeInRight"
          duration={500}
          delay={500 + (index*200)}
          elevation={1}
          style={styles.containerStyle}>

        <Touchable style={styles.favorite} onPress={props.onFavoritePress}>

          {props.isUserFavorite ?   <Icon name="favorite" size={30} color={colors.accent.default}/> :  <Icon name="favorite-border" size={30} color={colors.accent.default}/>}

        </Touchable>

        <Touchable style={styles.eventInfo} onPress={props.onPress}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={styles.competitorsLogosContainer}>
              {competitorsComponent}
            </View>

            <View style={styles.detailContainer}>
              <Text style={styles.eventNameText} numberOfLines={1} adjustsFontSizeToFit={true}>{props.name}</Text>
              {/*  <Text style={styles.businessesInfoText}>3 locali vicino a te</Text>*/}
              <Text style={styles.dateText}>{time}</Text>
            </View>
            <View style={styles.arrowIconView}>
              <Icon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
            </View>
          </View>
        </Touchable>
      </AnimatedView>

  );
};

const styles = {
  containerStyle: {
    borderRadius: themes.base.borderRadius,
    margin: 8,
    marginTop: 4,
    marginBottom: 4,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  favorite: {
    borderRightColor: colors.white.divisor,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    flexGrow: 0,
    flexBasis: 63,
    paddingBottom: 16
  },
  eventInfo: {
    flexGrow: 3,

  },
  competitorsLogosContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 0,
    flexBasis: 54,
    paddingTop: 22,
    paddingBottom: 18,

  },
  competitors: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    flex: 1,

  },
  detailContainer: {
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'center',
    flex: 1,
    flexWrap: 'wrap'
  },
  eventNameText: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    fontFamily: Fonts.Lato,
  },
  businessesInfoText: {
    fontSize: 14,
    color: colors.accent.default,
    fontFamily: Fonts.LatoBold,
  },
  dateText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight
  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
    height: '100%',
  },
  arrowImg: {
    marginRight: 8
  },

};


export default EventCard;
