import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const DismissButton = (props) => {

    const { onPress } = props;
    return (
        <Icon name="close" onPress={onPress} size={32} {...props}/>
    )
};

export default DismissButton;