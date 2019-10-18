import React from "react";
import {FlatList, StyleSheet } from "react-native";
import { withNavigation } from 'react-navigation';
import {scale, verticalScale} from "react-native-size-matters";
import ActivityIndicator from "../../components/ActivityIndicator/ActivityIndicator";
import {View} from "../../components/common";
import PrizeCard from "../../components/GameComponents/PrizeCard";
import useSimpleListController from "../../helpers/hooks/useSimpleListController";
import themes from "../../newTheme";

const PrizeList = (props) => {

  const { isLoading, ids, data, refresh, refreshing } = useSimpleListController('prizes', { id: 'prize_list'});

  const sortedIds = ids.sort((a,b) => data[a].order - data[b].order);
  return(

      <View style={{ flex:1, justifyContent: 'center'}}>
        {(!refreshing && isLoading)
            ? <ActivityIndicator color="#fff"/>
            : (<FlatList
                onRefresh={refresh}
                refreshing={refreshing}
                columnWrapperStyle={{ justifyContent: 'center'}}
                style={{ marginTop: verticalScale(12)}}
                data={sortedIds}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <View
                        key={item}
                        style={[styles.gridItem, {marginTop: index % 2 !== 0 ? verticalScale(16) : 0}]}
                        // delay={32 * index + 1}
                        // animation="fadeInLeft" useNativeDrive
                    ><PrizeCard onPress={() => props.navigation.navigate("PrizeDetailScreen", { award: data[item] })}
                                award={data[item]}/>
                    </View>
                )}
            />)}
      </View>
  )
};

const styles = StyleSheet.create({
  gridItem: {
    margin: 8,
    borderRadius: themes.base.borderRadius*3,
    flexBasis: themes.base.deviceDimensions.width / 2 - scale(16+16) // margini laterali + margini singoli
  },
  catalogView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: themes.base.deviceDimensions.height/30
  },
})
export default withNavigation(PrizeList);;
