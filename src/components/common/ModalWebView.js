import React, {useState} from 'react';
import {WebView, StyleSheet, ActivityIndicator, Text} from "react-native";
import Modal from "react-native-modal";
import {scale} from "react-native-size-matters";
import themes from "../../styleTheme";
import {Touchable} from "./index";


export default function ModalWebView(props) {

  const { url, onOkPress } = props;
  const [loading, setLoading] = useState(true);

  const handleOkPress = () => {
    setLoading(true);
    onOkPress();
  };


  return(
    <Modal
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      isVisible={props.isVisible}
      style={styles.modalViewContainer}
    >
      <WebView
        source={{uri: url}}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          style={{ position: "absolute", alignSelf: "center"}}
          color={themes.base.colors.accent.default}
          size="large"
        />
      )}
      <Touchable style={styles.button} onPress={handleOkPress}>
        <Text style={styles.buttonText}>OK</Text>
      </Touchable>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalViewContainer: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },
  button: {
    backgroundColor: themes.base.colors.accent.default,
    padding: scale(16),
    alignItems: "center",
    borderBottomRightRadius: themes.base.borderRadius,
    borderBottomLeftRadius: themes.base.borderRadius
  },
  buttonText: {
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoBold,
    color: themes.base.colors.white.default
  }
});