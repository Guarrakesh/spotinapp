import React from 'react';
import {StyleSheet} from "react-native";
import {Typography, View} from "../../components/common";
import AwardCard from "../../components/GameComponents/AwardCard";
import themes from "../../newTheme";

const topViewColor = "#3A169E";
const bottomViewColor = "#500F98";
const awards = [
  {
    name: "Birra",
    image: require("../../assets/img/awards/Birra.png")
  },
  {
    name: "2 Birre",
    image: require("../../assets/img/awards/BirraX2.png")
  },
  {
    name: "Panino",
    image: require("../../assets/img/awards/Panino.png")
  },
  {
    name: "Ticket",
    image: require("../../assets/img/awards/Ticket.png")
  }
];

class CatalogScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  componentDidMount(): void {

  }

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

    const leftAwards = [];
    const rightAwards = [];

    for(let i = 0; i < awards.length; i++){
      if (i % 2 === 0){
        leftAwards.push(awards[i]);
      }
      else {
        rightAwards.push((awards[i]));
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Typography style={styles.catalog}>Catalogo</Typography>
        </View>
        <View style={styles.bottomView}>
          <View style={{marginTop: -60, flexDirection: 'row'}}>
            <View>
              {leftAwards.map((item, index) => (
                <AwardCard award={item}/>
              ))}
            </View>
            <View style={{marginTop: 32}}>
              {rightAwards.map((item, index) => (
                <AwardCard award={item}/>
              ))}
            </View>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  },
  topView: {
    height: themes.base.deviceDimensions.height/4,
    backgroundColor: topViewColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catalog: {
    color: themes.base.colors.white.light,
    fontSize: 24,
    fontWeight: "900"
  },
  bottomView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: bottomViewColor,
  }
});

export default CatalogScreen;