import React from 'react';
import { Image } from "react-native";
import Images from '../../assets/images';
import PropTypes from 'prop-types';
// export const MASCOTTES = [
//   { id: 8, name: 'POLPO_PALLANUOTO', sport: 'waterpolo' },
//   { id: 0, name: 'BANANA_PALLAVOLO_2', sport: 'volley' },
//   { id: 1, name: 'BIRRA_CALCIO', sport: 'football'},
//   { id: 2, name: 'BROCCOLO_TENNIS', sport: 'tennis' },
//   { id: 3, name: 'ENERGY_MOTORI', sport: 'motori' },
//   { id: 4, name: 'HAMBURGER_RUGBY', sport: 'rugby' },
//   { id: 5, name: 'HOTDOG_BASKET', sport: 'hotdog' },
//   { id: 6, name: 'PIZZA_FOOTBALL', sport: 'american-ootball'},
//   { id: 7, name: 'POLLO_BOXE', sport: 'boxe' },
//   { id: 9, name: 'SUSHI_KARATE', sport: 'martial-arts' },
// ];


// interface Props extends WithStyles<typeof styles> {
//   sport: string;
//   style?: object;
//   className?: string;
//   width?: string | number;
//   height?: string | number;
// }

const Mascotte = ({ classes, sport, width, height, className = '', ...rest} : Props) => {
  return (
      <Image source={Images.icons.mascotte[sport]}

           style={{ width, height }}
           {...rest}
      />
  )
}

Mascotte.defaultProps = {
  sport: "waterpolo",
  width: 128,
  height: 128,
};
Mascotte.propTypes = {
  sport: PropTypes.string,
  style: PropTypes.object,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.numer]),
  height:  PropTypes.oneOf([PropTypes.string, PropTypes.numer]),
};

export default (Mascotte);
