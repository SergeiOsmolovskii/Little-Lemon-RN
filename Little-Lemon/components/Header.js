import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';


export const Header = () => {

  return (
      <Image
        style={styles.image}
        source={require('../assets/logo.png')}
        resizeMode='cover'
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    backgroundColor: '#dee3e9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 50,
    width: 200,
  }
});
