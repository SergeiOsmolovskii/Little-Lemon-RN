import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AvatarContainer } from '../components/AvatarContainer';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

export const ProfileScreen = () => {
  const navigator = useNavigation();
  const userNotifications = {
    orderStatus: true,
    passwordChange: true,
    specialsOffers: true,
    newsletters: true,
  };

  const [profileData, setProfileData] = useState({
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPhone: '',
    avatarURI: '',
    notifications: userNotifications
  });

  const handleSetImage = async (imageURL) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      avatarURI: imageURL,
    }));
  };

  useEffect(() => {
    (async () => {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          setProfileData(JSON.parse(profileData));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleTextChange = (field, text) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [field]: text,
    }));
  };

  const handleCheckboxChange = (checkboxKey) => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      notifications: {
        ...prevProfileData.notifications,
        [checkboxKey]: !prevProfileData.notifications[checkboxKey],
      },
    }));
  };

  const clearAll = async () => {

    try {
      const profileData = await AsyncStorage.getItem('profileData');
      if (profileData) {
        setProfileData(JSON.parse(profileData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveChanges = async () => {
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      alert('Your data has been successfully saved');
    } catch (error) {
      console.log(error);
    }
  }

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
      navigator.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Personal information</Text>
        <View >
          <Text style={styles.subtitle}>Avatar</Text>

          <AvatarContainer onImageSet={handleSetImage} />

          <View>
            <Text style={styles.subtitle}>First name</Text>
            <TextInput
              cursorColor={'#495E57'}
              style={styles.input}
              value={profileData.userFirstName}
              onChangeText={(text) => handleTextChange('userFirstName', text)}
            />

            <Text style={styles.subtitle}>Last name</Text>
            <TextInput
              cursorColor={'#495E57'}
              style={styles.input}
              value={profileData.userLastName}
              onChangeText={(text) => handleTextChange('userLastName', text)}
            />

            <Text style={styles.subtitle}>Email</Text>
            <TextInput
              cursorColor={'#495E57'}
              style={styles.input}
              value={profileData.userEmail}
              keyboardType='email-address'
              onChangeText={(text) => handleTextChange('userEmail', text)}
            />

            <Text style={styles.subtitle}>Phone number</Text>
            <TextInput
              cursorColor={'#495E57'}
              style={styles.input}
              value={profileData.userPhone}
              keyboardType='number-pad'
              onChangeText={(text) => handleTextChange('userPhone', text)}
            />
          </View>

          <Text style={styles.title}>Email notification</Text>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={profileData.notifications.orderStatus}
              onValueChange={() => handleCheckboxChange('orderStatus')}
            />
            <Text style={styles.checkboxText}>Order status</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={profileData.notifications.passwordChange}
              onValueChange={() => handleCheckboxChange('passwordChange')}
            />
            <Text style={styles.checkboxText}>Password change</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={profileData.notifications.specialsOffers}
              onValueChange={() => handleCheckboxChange('specialsOffers')}
            />
            <Text style={styles.checkboxText}>Specials offers</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              color={'#495E57'}
              value={profileData.notifications.newsletters}
              onValueChange={() => handleCheckboxChange('newsletters')}
            />
            <Text style={styles.checkboxText}>Newsletters</Text>
          </View>

          <Pressable style={styles.buttonLogout} onPress={logOut}>
            <Text style={styles.buttonLogoutText}>Log out</Text>
          </Pressable>

          <View style={styles.changesButtonsContainer}>
            <Pressable style={styles.discardButton} onPress={clearAll}>
                <Text style={styles.buttonText}>Discard changes</Text>
              </Pressable>
              <Pressable style={styles.button} onPress={saveChanges}>
                <Text style={styles.buttonText}>Save changes</Text>
              </Pressable>
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  profileContainer: {
    height: '100%',
    width: '100%',
    padding: 20,
    borderWidth: 1,
    borderColor: '#cbd2d9',
    borderRadius: 20
  },
  title: {
    textAlign: 'left',
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold'
  },
  subtitle: {
    marginBottom: 5,
    color: '#6c6d79',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10
  },
  image: {
    height: 80,
    width: 80,
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
  input: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#cbd2d9',
    borderRadius: 10,
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,

  },
  checkbox: {
    height: 20,
    width: 20,
    marginRight: 15,
    borderRadius: 5,
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  buttonLogout: {
    width: '100%',
    marginBottom: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dead35',
    backgroundColor: '#f4ce14'

  },
  buttonLogoutText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  discardButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  changesButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  }
});