import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { StyleSheet } from 'react-native';
import { Header } from './components/Header';
import { OnboardingScreen } from './screens/Onboarding';
import { HomeScreen } from './screens/Home';
import { ProfileScreen } from './screens/Profile';
import { SplashScreen } from './screens/SplashScreen';
import { ProfileIcon } from './components/ProfileIcon';

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export default function App() {

  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const updateProfileImage = (imageURL) => {
    setProfileImage(imageURL);
  };

  useEffect(() => {
    (async () => {
      try {
        const storage = await AsyncStorage.getItem('isOnboardingCompleted');
        const profileData = await AsyncStorage.getItem('profileData');
        const data = JSON.parse(profileData);
        // setProfileImage(data.avatarURI)
        // await AsyncStorage.clear()
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setIsOnboardingCompleted(storage ? true : false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (isOnboardingCompleted) {
        navigate('Home');
      } else {
        navigate('Onboarding');
      }
    }
  }, [isLoading, isOnboardingCompleted]);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <Header {...props} />,
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => (
              <ProfileIcon
                size={40}
                fontSize={20}
                profileImage={profileImage}
                onImageSet={updateProfileImage}
              />
            ),
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Icon
                name="arrow-back-circle-sharp"
                color="#495E57"
                size={40}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <ProfileIcon size={40} fontSize={20} profileImage={profileImage} onImageSet={updateProfileImage} />
            ),
            headerBackVisible: false
          })}

        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
  },
});
