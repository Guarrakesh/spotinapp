import {Platform} from "react-native";

export const platformShadow = (elevation, custom) => Platform.select({
  ios: {
    shadowOpacity: 0.0015 * elevation + 0.1,
    shadowRadius: 2 * elevation,
    shadowOffset: {
      height: 0.6 * elevation,
    },
  },
  android: {
    elevation
  }


})

export const androidBorder = Platform.OS === "android"
    ? {

      borderBottomWidth: 2,
      borderRadius: 0,
      borderColor: '#ddd',
    } : {};
