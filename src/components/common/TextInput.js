import React from 'react';
import { Input as BaseInput } from 'react-native-elements';


// TODO: TextInput comune per tutte le schermate (eccetto ad esempio quelle di Login che hanno i suoi stili)
const Input = (props) => {
    return (
        <BaseInput {...props} />
    );
};

const styles = {
    containerStyle: {
        borderBottomWidth: 1,
        borderColor:""
    }
}
