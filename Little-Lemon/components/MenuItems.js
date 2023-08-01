import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, } from 'react-native';

const MenuItem = ({ name, description, price, image }) => {

  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText((prevState) => !prevState);
  };


  return (
    <View style={styles.container}>
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuItemTitle}>{name}</Text>
        <Text
          style={styles.menuItemDescription}
          ellipsizeMode={showFullText ? 'clip' : 'tail'}
          numberOfLines={showFullText ? null : 2}
          onPress={toggleText}
        >
          {description}
        </Text>
        <Text style={styles.menuItemPrice}>${price}</Text>
      </View>
      <Image
        style={styles.image}
        source={{ uri: `https://raw.githubusercontent.com/SergeiOsmolovskii/capstone-images/main/menu/${image}` }}
        resizeMode='cover'
        accessible={true}
        accessibilityLabel={name}
      />
    </View>
  );
};

export const MenuItems = (props) => {
  const renderMenuItem = ({ item }) => <MenuItem name={item.name} price={item.price} description={item.description} image={item.image} />
  return (
    <FlatList
      data={props.data}
      keyExtractor={(item, index) => item.name + index}
      renderItem={renderMenuItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE'
  },
  menuItemContainer: {
    flex: 1,
    marginBottom: 10,
  },
  menuItemTitle: {
    marginBottom: 10,
    fontFamily: 'Karla-Medium',
    fontSize: 22,
    color: '#000000',
  },
  menuItemDescription: {
    flex: 1,
    fontFamily: 'Karla-Medium',
    fontSize: 16,
    color: '#495E57',
  },
  menuItemPrice: {
    fontFamily: 'Karla-Medium',
    fontSize: 22,
    color: '#495E57',
  },
  image: {
    width: 75,
    height: 90,
    marginLeft: 10,
    borderRadius: 8,
  },
});