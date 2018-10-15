import React from 'react';
import PropTypes from 'prop-types';


import { SearchBar as SearchBarBase, Icon } from 'react-native-elements';

//import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import themes from '../../styleTheme';
const searchBarStyle = themes.base.searchBar;


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.search = React.createRef();

  }
  handleClear() {

    this.props.onClear && this.props.onClear();
  }
  render() {
    const {
      containerStyle,
        inputContainerStyle,
        inputStyle,
        value,
        placeholder,
        onChangeText,
        ...rest } = this.props;
    return (<SearchBarBase
        ref={search => this.search = search}
        placeholder={placeholder || "Cerca..."}
        containerStyle={[searchBarStyle.container, containerStyle]}
        // placeholder='Cerca Locale'
        lightTheme={true}
        value={value}
        onChangeText={onChangeText}
        inputContainerStyle={[searchBarStyle.inputContainer, inputContainerStyle]}
        inputStyle={[searchBarStyle.inputStyle, inputStyle]}
        onClear={(e) => this.handleClear()}
        {...rest}
    />);
  }
}

SearchBar.propTypes = {
  onClear: PropTypes.func,
};


export default SearchBar;

