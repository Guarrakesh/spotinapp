import React from 'react';
import { SegmentedControlIOS } from 'react-native';

const SegmentControl = () => {
  return (
    <SegmentedControlIOS
      style={{ justifyContent: 'center', alignItems: 'center' }}
      values={['Local', 'Events']}
      selectedIndex={0}
      onChange={(event) => {
        this.setState({selectedIndex: 1});
      }}
    />
  )
};

export default SegmentControl;
