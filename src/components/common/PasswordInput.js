import React, {useRef, useState} from 'react';
import {TextInput, View, StyleSheet, Platform} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import themes from "../../styleTheme";
const colors = themes.base.colors;

const PasswordInput = React.forwardRef(({ value, style, ...rest}, ref) => {


  const [passwordShowIcon, setPasswordShowIcon] = useState('eye');
  const handlePasswordShowChange = () => {
    setPasswordShowIcon(passwordShowIcon === "eye" ? "eye-slash" : "eye");
  };
  return (
      <View style={styles.inputOuterContainer}>
        <Icon size={18} name="lock" style={styles.inputIcon}/>
        <TextInput
            ref={ref}
            allowFontScaling
            autoCapitalize='none'
            style={[
              styles.input,
              style,
            ]}
            value={value}
            textContentType='password'

            secureTextEntry={passwordShowIcon === "eye"}

            {...rest}

        />
        {value && value.length > 0 ? <Icon style={styles.passwordEyeIcon}
                                          size={18}
                                          name={passwordShowIcon}
                                          onPress={() => handlePasswordShowChange()}/> : null}
      </View>
  );

});

const androidBorder = Platform.OS === "android"
    ? {
      borderBottomWidth: 2,
      borderRadius: 0,
      borderColor: '#ddd',
    } : {};

const styles = StyleSheet.create({
  inputOuterContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 3, height: 10 },
    height: 44,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    ...androidBorder,
  },
  input: {
    minHeight: 44,
    flexBasis: 200,
    flexGrow: 2,
    marginLeft: 12,
    textAlign: 'left',
    borderRadius: 4,
    fontSize: 18,
    color: colors.text.dark,
    fontWeight: '500',
    justifyContent: 'center',

  },
  inputIcon : {
    flexBasis: 22,
    flexGrow: 0,
  },
})

export default PasswordInput;