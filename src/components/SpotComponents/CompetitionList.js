import React from 'react';
import CompetitionCard from './CompetitionCard';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';


const CompetitionList = (props) => {

  const { competitions } = props;
  if (competitions.length <= 0) {
    return null;
  }

  const competitionList = competitions.map((comp) =>

    <CompetitionCard
      key={comp._id}
      onPress={() => props.onItemPress(comp)}
      {...comp} />

  );

  return (
    <View style={styles.container}>
      {competitionList}
    </View>
  );

};

CompetitionList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 8,
  }
});

export default CompetitionList;
