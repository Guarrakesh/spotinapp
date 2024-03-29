import React from "react";
import EventCard from "./EventCard";
import PropTypes from "prop-types";
import { StyleSheet, SectionList, View, ActivityIndicator, Image, Linking } from "react-native";
import { withNamespaces } from 'react-i18next';
import DeviceInfo from 'react-native-device-info';
import {groupBy, debounce} from "lodash";
import moment from "moment";
import "moment/min/moment-with-locales"

import {Button, Typography} from '../common';
import themes from "../../styleTheme";
import Images from "../../assets/images";

moment.locale(DeviceInfo.getDeviceLocale());
const Fonts = themes.base.fonts;
class EventList extends React.Component {

  state = {isLoadingMore: false};


  loadMore = debounce(() => {
    const { isLoading, isRefreshing, setPage, page, total, perPage} = this.props;

    const nextPage = page + 1;
    //Mi assicuro che non sto sforando le pagine
    if ((Math.ceil(nextPage) < (total / perPage )) && !isLoading && !isRefreshing) {
      setPage(page + 1)
    }


  }, 1000, { leading: true, trailing: false});


  render() {

    const {
      isLoading = true,
      data,
      ids,
      refresh,
      isRefreshing,
      onItemPress,
      onFavoritePress,
      onContactUsPress,
      setPage,
      page,
      total,
      noContent,
      t,

      ...props
    } = this.props;


    let sectionKeys = groupBy(ids, id => moment(data[id].start_at).startOf('isoWeek'));

    sectionKeys = ids.reduce((sections, id) => {
      const date = new Date(data[id].start_at);
      const sectionKey = `${date.getDate().toString()}.${date.getMonth().toString()}`;
      if (!sections.includes(sectionKey))
        sections.push(sectionKey);

      return sections;
    }, []);

    const sections = sectionKeys.map(key => {
      const section = {key};
      section.data = ids.filter(id => {
        const date = new Date(data[id].start_at);
        const sectionKey = `${date.getDate().toString()}.${date.getMonth().toString()}`;
        return sectionKey === key;
      });
      return section;
    });


    const headerSection = ({section}) => {

      const date = moment(data[section.data[0]].start_at).format('dddd D MMMM').toString();

      return <Typography variant="subheading" gutterBottom style={{paddingLeft: 8, marginTop: 16}}>{date}</Typography>
    };

    if (noContent){
      return (
        <View style={styles.noContentView}>
          <Image source={Images.icons.common.notFound}/>
          <Typography  style={{margin: 8, color: '000',fontWeight: '900'}}
                       align="center"
                       uppercase >
            {t("browse.noEvents")}
          </Typography>
          <View style={styles.noFoundView}>
            <Typography variant="body" gutterBottom align={"center"}>{t("browse.noFoundEvent")}</Typography>
            <Button
              containerStyle={{marginBottom: 8}}
              variant="primary"
              onPress={() => onContactUsPress()}
              round
              uppercase>{t("browse.noBroadcasts.contactUs")}</Button>
          </View>
        </View>
      )
    }

    const footer = () => {
      if(isLoading){
        return (
          <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
        )
      }
      else if(ids.length > 0 && !isLoading) {
        return (
          <View style={styles.noFoundView}>
            <Typography variant="body" gutterBottom align={"center"}>{t("browse.noFoundEvent")}</Typography>
            <Button
              containerStyle={{marginBottom: 8}}
              variant="primary"
              onPress={() => onContactUsPress()}
              round
              uppercase>{t("browse.noBroadcasts.contactUs")}</Button>
          </View>
        )
      }
      else {
        return null;
      }
    };

    return (
      <SectionList
        renderItem={({item, index}) => <EventCard
          key={data[item]._id}
          index={index}
          onPress={ () => onItemPress(item, data[item])}
          onFavoritePress={ () => onFavoritePress(item, data[item])}
          {...data[item]}/>}
        contentContainerStyle={styles.container}
        onEndReached={this.loadMore.bind(this)}
        onEndReachedThreshold={0.5}
        renderSectionHeader={headerSection}
        sections={sections}
        stickySectionHeadersEnabled={false}
        onRefresh={refresh}
        refreshing={isRefreshing}
        ListFooterComponent={footer()}
        ListHeaderComponent={<Typography  style={{margin: 8, color: '000',fontWeight: '900'}}
                                          align="center"
                                          uppercase
        >{t("browse.selectEvent")}</Typography> }
      />
    );
  }
}


EventList.defaultProps = {
  isLoading: true,

};
EventList.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  onFavoritePress: PropTypes.func.isRequired,

  //Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,
  refresh: PropTypes.func,
  isRefreshing: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: themes.base.colors.white.default
  },
  noContentView: {
    flex :1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noContentText: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 20,
    color: themes.base.colors.text.default
  },
  sectionHeader: {
    marginLeft: 16,
    marginTop: 16,
    fontSize: 20,
    color: themes.base.colors.text.default,
    textTransform: 'capitalize',
    fontFamily: Fonts.LatoBold
  },
  noFoundView: {
    padding: 8,
    alignItems: "center",
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    margin: 16,
    paddingTop: 8,
    borderWidth: 1,
    borderColor: themes.base.colors.white.divisor
  }
});

export default withNamespaces()(EventList);
