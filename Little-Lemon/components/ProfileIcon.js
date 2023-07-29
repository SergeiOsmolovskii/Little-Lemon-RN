import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const ProfileIcon = (props) => {
  const navigation = useNavigation();
  const [initials, setInitials] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('profileData');
        const data = JSON.parse(storage);
         
        console.log(props)
        if (data.userFirstName && data.userLastName) {
          setInitials(`${data.userFirstName[0].toUpperCase()}${data.userLastName[0].toUpperCase()}`);
        } else if (data.userFirstName) {
          setInitials(`${data.userFirstName[0].toUpperCase()}`);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (

    <Pressable style={styles.icon} height={props.size} width={props.size} onPress={() => navigation.navigate('Profile')}>
      {props.profileImage ? (
        <Image source={{ uri: props.profileImage }} height={props.size} width={props.size} borderRadius={50} resizeMode='contain' accessible={true} accessibilityLabel={'Profile'} />
      ) : (
        <Text style={{ ...styles.text, fontSize: props.fontSize }}>{initials}</Text>
      )}
    </Pressable>

    // <Pressable style={styles.icon} height={props.size} width={props.size} onPress={() => navigation.navigate('Profile')}>
    //   <Text style={{ ...styles.text, fontSize: props.fontSize }}>{initials}</Text>
    // </Pressable>
  )
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#495E57'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#cbd2d9',
  },
  // image: {
  //   height: 50,
  //   width: 50,
  //   borderRadius: 50,
  // }
});