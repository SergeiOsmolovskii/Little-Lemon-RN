import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>

      <View style={styles.screenHeaderContainer}>
        <Text style={styles.title}>Little Lemon</Text>
        <View>

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>Chicago</Text>
          <Text style={styles.description}>We are a family  owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
        </View>
        <Image
          style={styles.image}
          source={require('../assets/hero.png')}
          resizeMode='cover'
          accessible={true}
          accessibilityLabel={'Hero'}
        />
        </View>
      </View>

    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff',
    alignItems: 'center',
  },
  screenHeaderContainer: {
    width: '100%',
    padding: 25,
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 64,
    color: '#F4CE14',
  },
  subtitle: {
    color: 'red'
  },
  description: {
    color: 'red'
  },
  textContainer: {

  },
  text: {
    color: 'red'
  },
  image: {
    height: 100,
    width:100
  }
});