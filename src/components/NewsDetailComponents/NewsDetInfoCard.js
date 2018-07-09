import React from 'react';
import { View, Image, Text } from 'react-native';
import NewsDetInfoHeader from './NewsDetInfoHeader';
import NewsDetInfo from './NewsDetInfo';

const NewsDetInfoCard = () => {
  return (
    <View style={{height: 206, width: 359, borderRadius: 5, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <NewsDetInfoHeader>
      </NewsDetInfoHeader>
      <NewsDetInfo>
      </NewsDetInfo>
    </View>
  );
};

export default NewsDetInfoCard;
