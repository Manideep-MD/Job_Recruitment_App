import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {authScreensConfig} from './authScreensConfig';
import {protectedScreensConfig} from './protectedScreensConfig';
import {useSelector} from 'react-redux';
import {SCREENS} from '../constants/screenNames';
import JobCategory from '../screens/JobCategory/JobCategory';
import Expertise from '../screens/Expertise/Expertise';
import ProfileDetails from '../screens/ProfileDetails/ProfileDetails';

// import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const token = useSelector((state: any) => state?.auth?.loginToken);
  const isProfileCompleted = useSelector(
    (state: any) => state?.auth?.isProfileCompleted,
  );

  const initialRoute = () => {
    if (!token) {
      return SCREENS.WELCOME;
    } else {
      if (!isProfileCompleted) {
        return SCREENS.CATEGORY;
      } else {
        return SCREENS.BOTTOM_TAB;
      }
    }
  };

  console.log(isProfileCompleted, 'isssssssssssssssss');

  return (
    <NavigationContainer
      onReady={() => {
        // SplashScreen.hide();
      }}>
      <Stack.Navigator
        initialRouteName={initialRoute()}
        screenOptions={{
          headerShown: false,
        }}>
        {authScreensConfig?.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}

        {token && protectedScreensConfig.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
          />
        ))}
        <Stack.Screen name={SCREENS.CATEGORY} component={JobCategory} />
        <Stack.Screen name={SCREENS.EXPERTISE} component={Expertise} />
        <Stack.Screen
          name={SCREENS.PROFILE_DETAILS}
          component={ProfileDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
