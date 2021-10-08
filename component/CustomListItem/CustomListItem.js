import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Color from '../../assets/style/Color';
import CustomModalItem from '../CustomModalItem/CustomModalItem';

function CustomListItem(props) {
  const [modalVisible, setModalVisible] = useState(false)

  const renderImage = () => {
    return (
      props.data.mission.missionPatch ?
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.data.mission.missionPatch }}
            style={styles.imageStyle}
            resizeMode={'contain'}
          />
        </View>
        :
        <View style={{...styles.imageContainer, backgroundColor: Color.GREY}}>
          <View style={styles.imageStyle}>
            <Text style={styles.noImageText}>NO IMAGE</Text>
          </View>
        </View>
    )
  }

  function onPressItem() {
    setModalVisible(true)
  }

  function onCloseModal() {
    setModalVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.itemContainer}
        activeOpacity={1}
        onPress={() => { onPressItem(props.data) }}
      >
        {renderImage()}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{props.data.mission.name}</Text>
        </View>
      </TouchableOpacity>
      <CustomModalItem data={props.data} isShow={modalVisible} closeModal={onCloseModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5
  },
  itemContainer: {
    flex: 1,
    backgroundColor: Color.TRANSPARENT_LIGHT,
    margin: 8,
    borderRadius: 8
  },
  imageContainer: {
    backgroundColor: Color.WHITE,
    borderRadius: 60,
    padding: 8,
    margin: 8,
    alignSelf: 'center'
  },
  imageStyle: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: Color.WHITE,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.BLACK,
    textAlign: 'center'
  },
  noImageText: {
    textAlign: 'center',
    color: Color.WHITE,
    fontWeight: 'bold'
  }
});

export default CustomListItem;
