import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text
} from 'react-native';
import Color from '../../assets/style/Color';

function CustomModalItem(props) {

  var contentTextList = [
    {
      label: "Mission Name:",
      value: props.data.mission.name
    },
    {
      label: "Rocket Name:",
      value: props.data.rocket.name
    },
    {
      label: "Rocket Type:",
      value: props.data.rocket.type
    },
    {
      label: "Site",
      value: props.data.site
    }
  ]

  const renderContentText = contentTextList.map((item, index) => {
    return (
      <Text key={index} style={styles.text}>{item.label}<Text style={styles.contentText}>{"\n" + item.value}</Text></Text>
    )
  })

  const renderImage = () => {
    return (
      props.data.mission.missionPatch ?
        <Image
          source={{ uri: props.data.mission.missionPatch }}
          style={styles.imageStyle}
          resizeMode={'contain'}
        />
        :
        <View style={styles.imageStyle}>
          <Text style={styles.noImageText}>NO IMAGE</Text>
        </View>
    )
  }

  const renderCloseButton = () => {
    return (
      <TouchableOpacity style={styles.closeButton} onPress={() => { onCloseModal() }}>
        <Text style={{ ...styles.noImageText, fontWeight: 'normal' }}>Close</Text>
      </TouchableOpacity>
    )
  }

  function onCloseModal() {
    props.closeModal()
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isShow}
      onRequestClose={() => {
        onCloseModal()
      }}
    >
      <View style={styles.transparentContainer}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {renderImage()}
          </View>
          <View style={styles.textContainer}>
            {renderContentText}
          </View>
          {renderCloseButton()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  transparentContainer: {
    flex: 1,
    backgroundColor: Color.TRANSPARENT_DARK,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: Color.WHITE
  },
  imageContainer: {
    backgroundColor: Color.GREY,
    borderRadius: 16,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 300,
    justifyContent: 'center'
  },
  textContainer: {
    padding: 8
  },
  text: {
    fontSize: 16,
    color: Color.BLACK,
    paddingVertical: 4
  },
  contentText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  noImageText: {
    textAlign: 'center',
    color: Color.WHITE,
    fontWeight: 'bold',
    fontWeight: 'bold',
    fontSize: 20
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
    backgroundColor: Color.BLACK,
    borderRadius: 8
  }
});

export default CustomModalItem;
