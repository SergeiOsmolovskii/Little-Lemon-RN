import React from 'react';
import { StyleSheet, View , Text, Image } from 'react-native';

export const Banner = () => {

  return (
    <View style={styles.banner}>

      <Text style={styles.title}>Little Lemon</Text>
      <View style={styles.descriptionContainer}>
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
  )
}

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: '#495E57',
  },
  title: {
    height: 64,
    fontFamily: 'MarkaziText-Medium',
    fontSize: 64,
    color: '#F4CE14',
  },
  subtitle: {
    fontFamily: 'MarkaziText-Regular',
    fontSize: 40,
    color: '#FFFFFF'
  },
  description: {
    fontFamily: 'Karla-Medium',
    fontSize: 18,
    color: '#FFFFFF',
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18
  },
  textContainer: {
    flex: 1
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 20
  },
})