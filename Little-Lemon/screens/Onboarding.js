import React, { useState } from 'react';
import { StyleSheet, View , TextInput, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const OnboardingScreen = ({navigation}) => {

  const [userNname, onChangeUserName] = useState('');
  const [email, onChangeEmail] = useState('');

  const createProfile = async () => {
    try {
      const data = {
        userFirstName: userNname,
        userLastName: '',
        userEmail: email,
        userPhone: '',
        avatarURI: '',
        notifications: {
          orderStatus: true,
          passwordChange: true,
          specialsOffers: true,
          newsletters: true,
        }
      }
      await AsyncStorage.setItem('profileData', JSON.stringify(data));
      await AsyncStorage.setItem('isOnboardingCompleted', JSON.stringify(true));
      navigation.navigate('Home');
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let us get to know you</Text>
      <Text style={styles.inputName}>First Name</Text>
      <TextInput
        cursorColor={'#495E57'}
        style={styles.input}
        value={userNname}
        onChangeText={onChangeUserName}
      />

      <Text style={styles.inputName}>Email</Text>
      <TextInput
        value={email}
        onChangeText={onChangeEmail}
        keyboardType={'email-address'}
        cursorColor={'#495E57'}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => createProfile()}
          disabled={ !userNname || !email}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 30,
    backgroundColor: '#cbd2d9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    paddingBottom: 100,
    color: '#495E57',
    fontSize: 32,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 30,
    borderWidth: 2,
    fontSize: 32,
    borderColor: '#495E57',
    borderRadius: 10
  },
  inputName: {
    marginBottom:10,
    color: '#495E57',
    fontSize: 32
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 32,
    color: '#495E57',
  }
});