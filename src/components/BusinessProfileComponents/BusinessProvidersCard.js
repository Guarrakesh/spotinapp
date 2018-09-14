import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Linking, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import themes from '../../styleTheme';
import {Fonts} from "../common/Fonts";

const BusinessProvidersCard = (props) => {

  const { phone } = props.business;

  return (

    <View elevation={2} style={{borderRadius: 50}}>
      <TouchableOpacity style={styles.container}>
        <View style={styles.phoneView}>
          <Icon name={"phone"} color={themes.base.colors.accent.default} size={25} style={{margin: 8}}/>
        </View>
        <Text style={styles.phoneText}>{phone}</Text>
        <Icon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themes.base.colors.white.light,
    borderRadius: 100,
    marginBottom: 16,
    height: 50
  },
  phoneView: {
    marginLeft: 8,
    borderWidth: 0,
    borderColor: themes.base.colors.accent.default,
    borderRadius: 50
  },
  phoneText: {
    color: themes.base.colors.accent.default,
    fontFamily: Fonts.LatoBold,
    fontSize: 22
  },
  arrowImg: {
    marginRight: 8
  },
})

export default BusinessProvidersCard;