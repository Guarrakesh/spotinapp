import React, { Fragment } from "react"
import { StyleSheet, Image } from "react-native";
import { View, Touchable } from "../common";
import { moderateScale } from "react-native-size-matters";
import themes from "../../newTheme";
import PropTypes from 'prop-types';
import VersionedImage from '../../components/common/VersionedImageField';
import Typography from "../common/Typography";

const imageSize = {
  height: themes.base.deviceDimensions.width / 3,
  width: themes.base.deviceDimensions.width / 3,
};
const PrizeCard = (props) => {

  const {name, image} = props.award;
  const {onPress, disabled} = props;

  return(
      <Touchable
        disabled={disabled}
        style={styles.innerTouchable}
        activeOpacity={.7} onPress={onPress}>
        <View style={styles.innerContainer}>
          {image && image.versions ?
              <Fragment>
                <VersionedImage
                    imgSize={imageSize}
                    source={image.versions} style={styles.imgStyle} />
                <Typography variant='subtitle'>{name}</Typography>
              </Fragment>
              : (
                  <Typography variant='heading'>{name}</Typography>
              )
          }
        </View>
      </Touchable>

  )
};

const styles = StyleSheet.create({
  innerTouchable: {
    margin: moderateScale(12),
    backgroundColor: themes.base.colors.white.default,
    borderRadius: themes.base.borderRadius *3,
  },
  innerContainer: {
    width: themes.base.deviceDimensions.width / 2 - 32,
    height: themes.base.deviceDimensions.width / 2 - 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: themes.base.borderRadius*3,

    padding: 16
  },
  imgStyle: {
    alignSelf: "center",

    //marginBottom: 24
  }
});

PrizeCard.propTypes = {
  award: PropTypes.shape({
    name: PropTypes.string,
    cost: PropTypes.number,
    grantingTime: PropTypes.number,
    slug: PropTypes.string,
    description: PropTypes.description,
  }).isRequired,
};
export default PrizeCard;
