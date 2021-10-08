import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import {
  useQuery,
  gql
} from "@apollo/client";

import Color from '../../assets/style/Color';
import CustomListItem from '../../component/CustomListItem/CustomListItem';
import CustomFloatingButton from '../../component/CustomFloatingButton/CustomFloatingButton';

function Main() {
  const [dataLaunches, setDataLaunches] = useState([])
  const [buttonVisible, setButtonVisible] = useState(false)

  const flatList = useRef();
  const imageBackground = require('../../assets/images/space.jpeg')

  const GET_LAUNCHES = gql`
  query getLaunches($after: String) {
    launches(after: $after, pageSize: 5) {
      cursor
      hasMore
      launches {
        site
        rocket {
          name
          type
        }
        mission {
          name
          missionPatch
        }
      }
    }
  }
  `;

  const { loading, error, data, fetchMore } = useQuery(GET_LAUNCHES, {
    notifyOnNetworkStatusChange: true,
  });

  const renderHeader = () => {
    return <Text style={styles.titleText}>Rocket Launches</Text>
  };

  const renderItem = ({ item, index }) => (
    <CustomListItem data={item} isFetching={loading} />
  );

  const renderFooter = () => {
    if (loading) return <ActivityIndicator size="large" color="white" />
    return <View />
  }

  function loadMore() {
    if (data.launches.hasMore) {
      fetchMore({
        variables: {
          after: data.launches.cursor
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.launches.launches = [
            ...prevResult.launches.launches,
            ...fetchMoreResult.launches.launches
          ];

          return fetchMoreResult;
        }
      })
    }
  }

  function handleScrollToTop() {
    flatList.current.scrollToOffset({ animated: true, offset: 0 });
  }

  function handleOnScroll(offsetY) {
    offsetY > 100 ? setButtonVisible(true) : setButtonVisible(false)
  }

  useEffect(() => {
    data !== undefined && setDataLaunches(data.launches.launches)
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={'black'} />
      <ImageBackground
        source={imageBackground}
        resizeMode={'cover'}
        style={styles.imageBackgroundStyle}
      >
        <SafeAreaView style={styles.transparentContainer}>
          {dataLaunches.length > 0 ?
            <FlatList
              ref={flatList}
              data={dataLaunches}
              keyExtractor={(item, index) => index.toString() + item.site}
              renderItem={renderItem}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              scrollEventThrottle={16}
              onEndReachedThreshold={0.9}
              initialNumToRender={5}
              maxToRenderPerBatch={10}
              windowSize={10}
              numColumns={2}
              onEndReached={() => {
                !loading && loadMore()
              }}
              onScroll={(e) => {
                handleOnScroll(e.nativeEvent.contentOffset.y)
              }}
            />
            :
            <View style={styles.imageBackgroundStyle}>
              <ActivityIndicator size="large" color="white" />
            </View>
          }
          <CustomFloatingButton isShow={buttonVisible} onPress={handleScrollToTop} />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  imageBackgroundStyle: {
    flex: 1,
    justifyContent: "center"
  },
  transparentContainer: {
    backgroundColor: Color.TRANSPARENT_DARK,
    flex: 1
  },
  titleText: {
    color: Color.WHITE,
    fontSize: 32,
    fontWeight: 'bold',
    padding: 16
  }
});

export default Main;
