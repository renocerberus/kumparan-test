import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import Color from '../../assets/style/Color';

function CustomButton(props) {
  const up = require('../../assets/images/up.png')

  function onPress() {
    props.onPress()
  }

  return (
    props.isShow &&
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={up}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Color.YELLOW,
    position: 'absolute',
    bottom: 56,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default CustomButton;
