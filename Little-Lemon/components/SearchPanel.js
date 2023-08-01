import React, { useState } from 'react';
import { StyleSheet, View, TextInput,  Image, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchPanel = (props) => {
  const [clicked, setClicked] = useState(true);

  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>

        <Icon
          name="search-sharp"
          color="#495E57"
          size={24}
          onPress={() => setClicked(!clicked)}
        />
        {(clicked ?
        <TextInput
         style={styles.input}
          // value={searchPhrase}
          // onChangeText={setSearchPhrase}
          // onFocus={() => {
          //   setClicked(true);
          // }}
        /> : null)}
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__clicked: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  searchBar__unclicked: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#495E57"
  }
})