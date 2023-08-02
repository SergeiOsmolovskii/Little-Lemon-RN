import React, { useState } from 'react';
import { StyleSheet, View , TextInput, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Banner } from '../components/Banner';
import { isEmailValid } from '../utils';
export const OnboardingScreen = ({navigation}) => {

  const [userNname, onChangeUserName] = useState('');
  const [email, onChangeEmail] = useState('');

  const createProfile = async () => {
    try {

      if (!isEmailValid(email)) {
        alert('Please enter a valid email address');
        return;
      }
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

      <Banner />

      <View style={styles.form}>

        <Text style={styles.inputName}>First Name*</Text>
        <TextInput
          cursorColor={'#495E57'}
          style={styles.input}
          value={userNname}
          onChangeText={onChangeUserName}
        />

        <Text style={styles.inputName}>Email*</Text>
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
            disabled={!userNname || !email}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#495E57',
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  text: {
    paddingBottom: 100,
    color: '#F4CE14',
    fontSize: 32,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 30,
    color: '#F4CE14',
    borderWidth: 2,
    fontSize: 32,
    borderColor: '#F4CE14',
    borderRadius: 10
  },
  inputName: {
    marginBottom:10,
    color: '#F4CE14',
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
    borderWidth: 2,
    borderColor: '#F4CE14',
  },
  buttonText: {
    fontSize: 32,
    color: '#F4CE14',
  }
});