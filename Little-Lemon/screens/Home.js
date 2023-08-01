import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView  } from 'react-native';
import { Checkbox } from './../components/Checkbox';
import { getMenuData } from '../api/api'
import { MenuItems } from '../components/MenuItems';
import { SearchPanel } from '../components/SearchPanel';



export const HomeScreen = () => {

  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => {
    (async () => {
      const data = await getMenuData();
      setMenuData(data);
    })();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.screenHeaderContainer}>
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
          
          <SearchPanel/>


      </View>

      <View style={styles.filterWrapper}>
        <Text style={styles.sectionTitle}>Order for Delivery</Text>
          <View style={styles.checkboxWrapper}>
            <Checkbox title={'Starters'} isChecked={false}/>
            <Checkbox title={'Mains'} isChecked={false}/>
            <Checkbox title={'Desserts'} isChecked={false}/>
            <Checkbox title={'Sides'} isChecked={false}/>
          </View>
      </View>

        {menuData ? (
          <MenuItems data={menuData} />
          ) : (
            <Text>Loading...</Text>
            )}
            
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
    // alignItems: 'center',
  },
  screenHeaderContainer: {
    width: '100%',
    padding: 25,
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
  filterWrapper: {
    width: '100%',
    paddingHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#EDEFEE'
  },
  sectionTitle: {
    marginBottom: 10,
    fontFamily: 'Karla-ExtraBold',
    fontSize: 20,
    textTransform: 'uppercase'
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});