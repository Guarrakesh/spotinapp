import React from "react";
import { View} from "../common";
import Touchable from "../common/Touchable"
import {Text} from "react-native";
import * as Animatable from 'react-native-animatable';
import themes from '../../styleTheme';

const AnimatedTouchable = Animatable.createAnimatableComponent(Touchable);

const FloatingCard = (props) => {

  return (

    <AnimatedTouchable
      useNativeDriver={true}
      duration={500 + (props.index * 100)}
      //delay={300} //su iOS fa sparire la card al primo press
      easing={"ease-in-cubic"}
      animation={"fadeIn"}
      style={
      [styles.card,
        props.containerStyle && props.containerStyle,
        { elevation: 1, ...themes.base.elevations.depth2 }]}
               onPress={props.onPress}
               disabled={props.disabled}
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
    </AnimatedTouchable>

  )
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderWidth: 0,
    borderRadius: 4,
    flex: 1
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
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    flexGrow: 1,
  }

};



export default FloatingCard;
