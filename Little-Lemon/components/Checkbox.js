import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export const Checkbox = (props) => {

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.isChecked);
  }, []);

  return (
    <Pressable
      style={[styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={() => setChecked(!checked)}
    >
      <Text style={styles.text}>{props.title}</Text>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  checkboxBase: {
    backgroundColor: '#EDEFEE',
    padding: 10,
    borderRadius: 8
  },
  text: {
    fontFamily: 'Karla-ExtraBold',
    fontSize: 16,
    color: '#495E57'
  },
  checkboxChecked: {
    backgroundColor: '#F4CE14',

  },
})