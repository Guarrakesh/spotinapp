import React from "react"
import { StyleSheet, Image } from "react-native";
import { View, Touchable } from "../common";
import themes from "../../newTheme";

type Props = {
  award: Required
}
const AwardCard = (props: Props) => {

  const {name, image} = props.award;

  return(
    <View style={styles.container}>
      <Touchable style={styles.innerTouchable}>
        <View style={styles.innerContainer}>
          <Image resizeMode={"contain"} source={image} style={styles.imgStyle} />
        </View>
      </Touchable>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    overflow: "hidden", //altrimenti su Android il ripple esce dai margini
    borderRadius: themes.base.borderRadius*3
  },
  innerTouchable: {
    backgroundColor: themes.base.colors.white.default,
    borderRadius: themes.borderRadius
  },
  innerContainer: {
    width: themes.base.deviceDimensions.width / 2 - 32,
    height: themes.base.deviceDimensions.width / 2 - 32,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  imgStyle: {
    alignSelf: "center",
    height: themes.base.deviceDimensions.width / 3,
    width: themes.base.deviceDimensions.width / 3,
    //marginBottom: 24
  }
});

export default AwardCard;