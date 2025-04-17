import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {renderTabIcon} from './helper';
import {useCustomTheme} from '../theme/ThemeContext';
import {SCREENS} from '../constants/screenNames';
import Home from '../screens/Home/Home';
import Saved from '../screens/Saved/Saved';
import Analytics from '../screens/Analytics/Analytics';
import Profile from '../screens/Profile/Profile';

const BottomTab = createBottomTabNavigator();

export const BOTTOM_BAR_HEIGHT = 56;

const BottomTabNavigation = () => {
  const {theme} = useCustomTheme();

  return (
    <View style={styles.container}>
      <BottomTab.Navigator
        initialRouteName={SCREENS.HOME}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => renderTabIcon(route, focused, theme),
          headerShown: false,
          tabBarActiveTintColor: theme?.primary,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: BOTTOM_BAR_HEIGHT,
            paddingTop: 10,
          },
        })}>
        <BottomTab.Screen name={SCREENS.HOME} component={Home} />
        <BottomTab.Screen name={SCREENS.SAVED} component={Saved} />
        <BottomTab.Screen name={SCREENS.ANALYTICS} component={Analytics} />
        <BottomTab.Screen name={SCREENS.PROFILE} component={Profile} />
      </BottomTab.Navigator>
    </View>
  );
};
export default BottomTabNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
