import React from "react"
import { StyleSheet, Image } from "react-native";
import { View, Touchable } from "../common";
import themes from "../../newTheme";
import PropTypes from 'prop-types';
import VersionedImage from '../../components/common/VersionedImageField';

const imageSize = {
  height: themes.base.deviceDimensions.width / 3,
  width: themes.base.deviceDimensions.width / 3,
};
const AwardCard = (props: Props) => {

  const {name, image} = props.award;

  return(
      <View style={styles.container}>
        <Touchable style={styles.innerTouchable} activeOpacity={.7}>
          {image && image.versions ?  <View style={styles.innerContainer}>
            <VersionedImage
                imgSize={imageSize}
                source={image.versions} style={styles.imgStyle} />

          </View> : null }
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

    //marginBottom: 24
  }
});

AwardCard.propTypes = {
  award: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.number,
    grantingTime: PropTypes.number,
    slug: PropTypes.string,
    description: PropTypes.description,
  }).isRequired,
}
export default AwardCard;
