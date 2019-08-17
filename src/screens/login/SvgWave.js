import React from "react";
import {Dimensions} from "react-native";
import {Path} from "react-native-svg";
import themes from "../../styleTheme";
const { width, height} = Dimensions.get('screen');

const SvgWave = ({pathProps}) => (
    <Path

        d={`
              M0 1
              C0 1, 32 92.5771, 182.5 34.0386
              C333 -24.5, 388 11.5386, 388 11.5386
              V${height - 200}
              H0
              L0 1
              Z`}
        fill={themes.base.colors.accent.default}
        {...pathProps}
    />

);

export default SvgWave;
