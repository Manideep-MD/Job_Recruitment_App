import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {authScreensConfig} from './authScreensConfig';
import {protectedScreensConfig} from './protectedScreensConfig';
import {useSelector} from 'react-redux';
import {SCREENS} from '../constants/screenNames';
import JobCategory from '../screens/JobCategory/JobCategory';
import Expertise from '../screens/Expertise/Expertise';
// import SplashScreen from "react-native-splash-screen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  const token = useSelector((state: any) => state?.auth?.loginToken);

  return (
    <NavigationContainer
      onReady={() => {
        // SplashScreen.hide();
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!token &&
          authScreensConfig?.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}

        {token &&
          protectedScreensConfig.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
        <Stack.Screen name={SCREENS.CATEGORY} component={JobCategory} />
        <Stack.Screen name={SCREENS.EXPERTISE} component={Expertise} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
