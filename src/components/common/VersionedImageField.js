import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { Image } from 'react-native';


/* eslint-disable */
const sanitizeRestProps = (rest) => ({
  addLabel,
  allowEmpty,
  basePath,
  cellClassName,
  className,
  formClassName,
  headerClassName,
  label,
  linkType,
  locale,
  record,
  resource,
  sortable,
  sortBy,
  source,
  textAlign,
  translateChoice,
  ...rest
}) => rest;
/* eslint-enable */


export const VersionedImageField = ({
  style,
  source,
  minSize,
  imgSize,
  ...rest
}) => {
  //Posto che il source dato in ingresso sia un'array, trovo la versione dell'immagine con la dimensione più prossima a quella data (minSize)

  const sourceValue = source;

  if (!sourceValue)
    return  null;
    let version; //oggetto con { url, width, height }
  if (sourceValue.length == 1) {
    version = sourceValue[0];
  } else {
    //Ordino l'array di immagini in ordine crescente di dimensioni in base a minSize (uso la distanza euclidea)
    const sorted = sourceValue.sort((a, b) => {
      const aToMinSizeDistance = Math.sqrt(Math.pow((a.width - minSize.width), 2) + Math.pow((a.height - minSize.height), 2));
      const bToMinSizeDistance = Math.sqrt(Math.pow((b.width - minSize.width), 2) + Math.pow((b.height - minSize.height), 2));
      //Se la differenza è < 0, allora la distanza di A da minSize è minore e quindi a è più vicino a minSize di quanto lo sia b
      return aToMinSizeDistance - bToMinSizeDistance;
    });
    version = sorted[0];

  }

  return (
  <Image source={{uri: version.url, width: imgSize.width, height: imgSize.height}}
         style={{width: imgSize.width, height: imgSize.height, ...style}}
         resizeMode={"contain"} />

  );


}

VersionedImageField.defaultProps = {
  minSize: {width: 32, height: 32 }
};

VersionedImageField.propTypes = {
  imgSize: PropTypes.object,
  style: PropTypes.object,
  minSize: PropTypes.object,
  source: PropTypes.string.isRequired,
};

export default (VersionedImageField);


