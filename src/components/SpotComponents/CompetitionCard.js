

import React from 'react';
import {View, VersionedImageField} from '../common';
import { Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from "../common/Fonts";


const CompetitionCard = (props) => {

  const {
    sport_id,
    name,
    country,
    week_events,
    image_versions

  } = props;

  let imageUrl;



  return (
    <TouchableOpacity onPress={props.onPress}>
      <View elevation={1} style={styles.container}>
        <View style={styles.image}>
          { image_versions
              ? <VersionedImageField source={image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 32, height: 32}} />
              : <Icon name="sports-club" size={42}/> }
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.country}>{country}</Text>
          { week_events.length > 0 && <Text style={styles.extra}>{week_events.length} eventi questa settimana </Text> }
        </View>
        <View style={styles.arrowIconView}>
          <Icon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
        </View>
      </View>
    </TouchableOpacity>

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
    fontStyle: 'normal'
  },
  country: {
    fontWeight: '300',
    fontSize: 14
  },
  extra: {
    fontWeight: '700',
    color: themes.base.colors.accent.default
  },
  info: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'column',
    flexGrow: 2,
  },
  container: {
    width: '100%',
    backgroundColor: themes.base.colors.white.default,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    borderRadius: themes.base.borderRadius,


  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
    height: '100%',
    position: 'absolute'
  },
  arrowImg: {
    marginRight: 8
  },
})

export default CompetitionCard;


