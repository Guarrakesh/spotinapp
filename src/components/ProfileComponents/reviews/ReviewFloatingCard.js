import React from "react";
import { StyleSheet, TextInput } from "react-native";
import {View} from "../../common";
import themes from "../../../styleTheme";
import Typography from "../../common/Typography";
import Button from "../../common/Button";
import i18n from "../../../i18n/i18n";

const textColor = themes.base.colors.white.default;
const deviceWidth = themes.base.deviceDimensions.width;
const deviceHeight = themes.base.deviceDimensions.height;


const ReviewFloatingCard = (props) => {

  const {answers, type} = props.question;

  //TODO: Valutare testo tasto Conferma

  if(type === "comment"){
    return (
      <View elevation={3} style={styles.questionView}>
        <View style={styles.questionTextView}>
          <Typography style={styles.questionText}>{props.question.quest}</Typography>
        </View>
        <View style={styles.answersView}>
            <TextInput
              placeholder={i18n.t("profile.reservations.typeComment")}
              multiline={true}
              style={styles.commentInput}
              onChangeText={(text) => props.onCommentChange(text)}
            />
          <Button uppercase={true}
                  onPress={() => props.onConfirmPress()}
                  containerStyle={{marginTop: 12}}
                  title={i18n.t("common.confirm").toUpperCase()}
                  variant={"primary"}
                  round/>
        </View>
      </View>
    );
  }
  else {
    return (
      <View elevation={3} style={styles.questionView}>
        <View style={styles.questionTextView}>
          <Typography style={styles.questionText}>{props.question.quest}</Typography>
        </View>
        <View style={styles.answersView}>
          {
            answers.map((answer, index) => (
              <Button
                elevation={1}
                containerStyle={styles.answerButton}
                round={true}
                variant={props.rating[type] === index+1 ? "primary" : "grey"}
                title={answer}
                titleStyle={props.rating[type] !== index+1 ? {color: themes.base.colors.text.dark} : null}
                onPress={() => props.onPress(index, type)}
              />
            ))
          }
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  questionView: {
    height: deviceHeight/1.9,
    width: deviceWidth/1.3,
    backgroundColor: themes.base.colors.white.default,
    // position: "absolute",
    // margin: deviceWidth/9,
    // marginTop: deviceHeight/4,
    alignSelf: "center",
    borderRadius: themes.base.borderRadius,
    alignItems: "center"
  },
  questionTextView: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: themes.base.colors.white.divisor
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  answersView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginRight: 32,
    // marginLeft: 32,
    paddingBottom: 16
  },
  answerButton: {
    marginTop: deviceHeight/60,
    width: deviceWidth/1.5
  },

  commentInput: {
    width: deviceWidth/1.5,
    height: deviceHeight/3,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 8,
    textAlignVertical: 'top',
    borderColor: themes.base.colors.white.divisor,
    borderWidth: 1,
    borderRadius: themes.base.borderRadius
  }
});

export default ReviewFloatingCard;