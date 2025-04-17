import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {authScreensConfig} from './authScreensConfig';
import {protectedScreensConfig} from './protectedScreensConfig';
import {useSelector} from 'react-redux';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
