import { AppRegistry } from 'react-native';
import React from 'react';
// import App from './src';
import NewsList from './src/components/NewsComponents/NewsList';
import NewsCard from './src/components/NewsComponents/NewsCard';
import NewsDescription from './src/components/NewsComponents/NewsDescription';
import EventNewsCard from './src/components/NewsComponents/EventNewsCard';
import DetailNewsList from './src/components/NewsDetailComponents/DetailNewsList';

AppRegistry.registerComponent('spotinapp', () => NewsList);
