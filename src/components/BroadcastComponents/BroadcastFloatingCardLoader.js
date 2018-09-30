import React, { Component } from 'react';

import ContentLoader from 'react-native-content-loader';
import { Rect } from 'react-native-svg';

const BroadcastFloatingCardLoader = ({height = 400, width = 200, duration = 1000, ...rest}) => (
  <ContentLoader
  height={height}
  width={width}
  duration={duration}
  primaryColor="#f3f3f3"
  secondaryColor="#ecebeb"
  {...rest} >
  <Rect x="19.09" y="128.75" rx="3" ry="3" width="350" height="6.4" transform="rotate(0.38, 19.09, 128.75)" />
  <Rect x="17.96" y="144.75" rx="3" ry="3" width="380" height="6.4" transform="rotate(0.38, 17.96, 144.75)" />
  <Rect x="21" y="111" rx="3" ry="3" width="201" height="6.4" />
  <Rect x="17" y="-2.2" rx="0" ry="0" width="213" height="101" />
  <Rect x="71" y="45.2" rx="0" ry="0" width="0" height="13" />
  </ContentLoader>
)

export default BroadcastFloatingCardLoader;
