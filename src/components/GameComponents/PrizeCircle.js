import React from "react";
import {StyleSheet} from "react-native";
import {Touchable, VersionedImageField, View} from "../common";
import themes from "../../newTheme";
import {moderateScale} from "react-native-size-matters";

const imgSize = themes.base.deviceDimensions.width/3;

const imageSize = {
  height: imgSize,
  width: imgSize
};

const PrizeCircle = (props) => {

  const { name, image } = props.award;
  const { onPress, disabled } = props;

  return (
    <View style={styles.dashedContainer}>
      <Touchable
        style={styles.container}
        disabled={disabled}
      >
        <VersionedImageField
          imgSize={imageSize}
          source={image.versions} style={styles.imgStyle} />
      </Touchable>
    </View>
  )
};

const styles = StyleSheet.create({
  dashedContainer: {
    borderRadius: imgSize,
    borderWidth: 3,
    borderColor: themes.base.colors.yellow.default,
    borderStyle: "dashed"
  },
  container: {
    margin: moderateScale(3),
    padding: moderateScale(16),
    borderRadius: imgSize,
    backgroundColor: "rgba(0,0,0,0.3)"
  }
});

export default PrizeCircle;
