import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Pressable, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileIcon } from '../components/ProfileIcon';

export const AvatarContainer = ({ onImageSet }) => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('profileData');
        setImage(storage ? JSON.parse(storage).avatarURI : null);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      onImageSet(result.assets[0].uri);
      try {
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeImage = () => {
    setImage(null);
    onImageSet(null);
  };

  return (

    <View style={styles.avatarContainer}>
      {image ? <ProfileIcon size={80} fontSize={40} profileImage={image}/> : <ProfileIcon size={80} fontSize={40} />}
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Change</Text>
      </Pressable>

      <Pressable style={styles.removeButton} onPress={removeImage}>
        <Text style={styles.buttonText}>Remove</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#495E57'
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#495E57',
    color: '#cbd2d9',
  },
  buttonText: {
    color: '#cbd2d9',
    fontSize: 14,
    fontWeight: 'bold'
  },
});