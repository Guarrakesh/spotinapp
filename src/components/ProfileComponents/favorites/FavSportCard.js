import React from "react";
import { StyleSheet, Platform } from "react-native";
import FloatingCard from "../../common/FloatingCard";
import themes from "../../../styleTheme";
import {Fonts} from "../../common/Fonts";
import View from "../../common/View";

const FavSportCard = (props) => {

  const {isSelected, isDisabled} = props;

  return (
    <View style={isSelected ? styles.outerSelected : styles.outer}>
      <FloatingCard
        onPress={isDisabled ? null : props.onPress}
        contentStyle={styles.cardContent}
        containerStyle={isSelected ? styles.containerSelected :styles.container}
        footContent={props.name}
        disabled={isDisabled}
        footStyle={isSelected ? styles.cardFooterSelected : styles.cardFooter}
        footTitleStyle={{
          color: isSelected ? themes.base.colors.accent.default : themes.base.colors.text.default,
          fontSize: 16,
          opacity: isDisabled ? 0.5 : 1.0,
          fontFamily: isSelected ? Fonts.LatoBold : Fonts.Lato,
        }}
      >
        {props.icon}
      </FloatingCard>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex:1,
    overflow: Platform.OS === "android" ? "hidden" : null,
    margin: 8,
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius/2,
  },
  outerSelected: {
    flex:1,
    margin: 8,
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius/2,
    shadowColor: themes.base.colors.accent.default,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderColor: themes.base.colors.accent.default
  },
  container: {
    //margin: 8,
  },
  containerSelected: {
    //margin: 8,

  },

  cardFooter: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: themes.base.colors.white.divisor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  cardFooterSelected: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: themes.base.colors.accent.default,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },

  cardContent: {
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems:'center',

  }
});

export default FavSportCard;
