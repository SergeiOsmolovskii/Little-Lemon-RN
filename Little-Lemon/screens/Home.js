import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Checkbox } from './../components/Checkbox';
import { getMenuData } from '../api/api'
import { MenuItems } from '../components/MenuItems';
import { SearchPanel } from '../components/SearchPanel';
import { createTable, getMenu, saveMenu, filterByQueryAndCategories } from '../DB/database';
import { useDebounce } from '../Hocks/useDebounce';

export const HomeScreen = () => {
  const [menuData, setMenuData] = useState(null);
  const [query, setQuery] = useState('');
  const categories = ['starters', 'mains', 'desserts', 'sides'];
  const [filterSelections, setFilterSelections] = useState(categories.map(() => false));

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenu();
        if (!menuItems.length) {
          menuItems = await getMenuData();
          saveMenu(menuItems);
        }
        setMenuData(menuItems);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, []);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    filterMenuItems();
  }, [debouncedQuery, filterSelections]);

  const handleSearchTextChange = (text) => {
    setQuery(text);
  };

  const handleCheckboxChange = (index) => {
    const updatedFilterSelections = [...filterSelections];
    updatedFilterSelections[index] = !updatedFilterSelections[index];
    setFilterSelections(updatedFilterSelections);
  };

  const filterMenuItems = async () => {
    if (!menuData) return;

    const activeCategories = getActiveCategories();
    const filteredMenu = await filterByQueryAndCategories(debouncedQuery, activeCategories);
    setMenuData(filteredMenu);
  };

  const getActiveCategories = () => {
    const activeCategories = categories.filter((_, index) => filterSelections[index]);
    return activeCategories.length === 0 ? categories : activeCategories;
  };

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

        <SearchPanel query={query} onSearch={handleSearchTextChange} />

      </View>

      <View style={styles.filterWrapper}>
        <Text style={styles.sectionTitle}>Order for Delivery</Text>
        <View style={styles.checkboxWrapper}>{categories.map((item, index) => (
          <Checkbox
            key={item}
            title={item}
            isChecked={filterSelections[index]}
            onChange={() => handleCheckboxChange(index)}
          />
        ))}
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