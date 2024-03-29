import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {withNamespaces} from 'react-i18next';
import {Touchable, VersionedImageField, View} from '../common';

import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";
import * as Animatable from 'react-native-animatable';

const AnimatedView = Animatable.createAnimatableComponent(View);


const CompetitionCard = (props) => {

  const {
    sport_id,
    name,
    country,
    weekEvents,
    image_versions,
    index,
    t

  } = props;

  return (
        <Touchable
          onPress={props.onPress}
          style={[styles.container, {...themes.base.elevations.depth1}]}>
          <AnimatedView
            useNativeDriver={true}
            animation="fadeInRight"
            duration={500}
            delay={300 + (index*200)}
            style={{flexDirection: 'row'}}>

            <View style={styles.image}>
              { image_versions
                ? <VersionedImageField source={image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 64, height: 64}} />
                : <Icon name="sports-club" size={42}/> }
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit={true}>{name}</Text>
              <Text style={styles.country} numberOfLines={1} adjustsFontSizeToFit={true}>{country}</Text>
              <Text style={styles.extra} numberOfLines={1} adjustsFontSizeToFit={true}>
                {weekEvents > 0 ?  t('browse.weekEvents', { count: weekEvents}) : ""}
              </Text>
            </View>
            <View style={styles.arrowIconView}>
              <Icon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
            </View>
          </AnimatedView>
        </Touchable>
  );
};


CompetitionCard.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  week_events: PropTypes.array
};
const styles = StyleSheet.create({

  image: {
    width: 64,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    color: themes.base.colors.text.default,
    fontFamily: Fonts.Lato,
  },
  country: {
    fontWeight: '300',
    fontSize: 14,
    fontFamily: Fonts.Lato,
  },
  extra: {
    fontWeight: '700',
    color: themes.base.colors.accent.default
  },
  info: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },
  container: {
    width: '100%',
    backgroundColor: themes.base.colors.white.light,
    height: 100,
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: themes.base.borderRadius,
    elevation: 1

  },
  arrowIconView: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  arrowImg: {
    marginRight: 8
  },
});

export default withNamespaces()(CompetitionCard);


