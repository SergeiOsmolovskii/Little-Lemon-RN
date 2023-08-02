import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export const Checkbox = (props) => {
  const { title, index, isChecked, onChange } = props;

  return (
    <Pressable
      style={[styles.checkboxBase, isChecked && styles.checkboxChecked]}
      onPress={() => onChange(index)}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkboxBase: {
    backgroundColor: '#EDEFEE',
    padding: 5,
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