import React from "react";
import EventCard from "./EventCard";
import PropTypes from "prop-types";
import {StyleSheet, SectionList, Text, View, ActivityIndicator} from "react-native";
import {groupBy, debounce} from "lodash";
import moment from "moment";
import "moment/locale/it";
import {Fonts} from "../common/Fonts";
import themes from "../../styleTheme";
import Icon from "react-native-vector-icons/Entypo";


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
        setPage,
        page,
        total,
        ...props
    } = this.props;


    let sectionKeys = groupBy(ids, id => moment(data[id].start_at).startOf('isoWeek'));

    sectionKeys = ids.reduce((sections, id) => {
      const date = new Date(data[id].start_at);
      const sectionKey = `${date.getDate().toString()}.${date.getMonth().toString()}`;
      if (!sections.includes(sectionKey))
        sections.push(sectionKey);

      return sections;
    }, new Array());

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

      const date = moment(data[section.data[0]].start_at).locale('it').format('dddd D MMMM').toString();

      return <Text style={styles.sectionHeader}>{date}</Text>
    };

    if (!isLoading && ids.length === 0){
      return (  <View style={styles.noContentView}>
              <Text style={styles.noContentText}>
              Non ci sono eventi al momento
            </Text>
          </View>
      )
    }

    return (
        <SectionList
            renderItem={({item}) => <EventCard
                key={data[item]._id}
                onPress={ ()=> onItemPress(item, data[item])}
                onFavoritePress={ () => onFavoritePress(item)}
                {...data[item]}/>}
            contentContainerStyle={styles.container}
            onEndReached={this.loadMore.bind(this)}
            onEndReachedThreshold={0.5}
            renderSectionHeader={headerSection}
            sections={sections}
            stickySectionHeadersEnabled={false}
            onRefresh={refresh}
            refreshing={isRefreshing}
            ListFooterComponent={isLoading && <ActivityIndicator/>}
            ListHeaderComponent={<Text style={themes.base.listTitleStyle}>Seleziona l'evento</Text> }
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
  sectionHeader:
      {
        marginLeft: 16,
        marginTop: 16,
        fontSize: 20,
        color: themes.base.colors.text.default,
        textTransform: 'capitalize',
        fontFamily: Fonts.LatoBold
      }
});

export default EventList;
