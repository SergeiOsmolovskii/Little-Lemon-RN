import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/splash-lemon.png')}
        resizeMode='contain'
        accessible={true}
        accessibilityLabel={'Little Lemon Logo'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: '90%',
    width: '90%',
  }
});