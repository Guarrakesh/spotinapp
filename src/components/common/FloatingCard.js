import React from "react";
import {Touchable, View} from "../common";
import {Text} from "react-native";

import themes from '../../styleTheme';
const FloatingCard = (props) => {
  return (

    <Touchable style={
      [styles.card,
        props.containerStyle && props.containerStyle,
        {elevation: 2, ...themes.base.elevations.depth2}]}
               onPress={props.onPress}
    >
      <View style={{flexDirection: 'column'}}>
        <View style={[
          styles.contentStyle,
          props.contentStyle && props.contentStyle
        ]}>
          {props.children}
        </View>


        <View style={[
          styles.footStyle,
          props.footStyle && props.footStyle]}
        >
          <Text style={[
            styles.footTitleStyle,
            props.footTitleStyle && props.footTitleStyle]}
                numberOfLines={1}
                adjustsFontSizeToFit={true}
          >
            {props.footContent}
          </Text>
        </View>
      </View>
    </Touchable>

  )
}

const styles = {
  card: {
    margin: 8,

    backgroundColor: '#fff',

    borderWidth: 0,
    borderRadius: 4,
    flex: 1,

  },
  footTitleStyle: {
    backgroundColor: 'transparent'
  },
  footStyle: {
    flexGrow: 2 ,
    borderBottomLeftRadius: 4,
    backgroundColor: 'transparent',
    paddingTop: 8,
    borderBottomRightRadius: 4,
    width: '100%',
    alignItems: 'stretch',
    flexWrap: 'wrap'
  },
  contentStyle: {
    paddingTop: 15, paddingLeft: 15, paddingRight: 15,
    flexGrow: 1,
  }

}



export default FloatingCard;
