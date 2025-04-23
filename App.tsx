import React, {useEffect} from 'react';
import {ThemeProvider} from './src/theme/ThemeContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Alert, BackHandler} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthProvider} from './src/context/AuthContext';
import Toast from 'react-native-toast-message';

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Exit App', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <GestureHandlerRootView>
            <ThemeProvider>
              <SafeAreaProvider>
                <SafeAreaView style={{flex: 1}}>
                  <AppNavigation />
                  <Toast />
                </SafeAreaView>
              </SafeAreaProvider>
            </ThemeProvider>
          </GestureHandlerRootView>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
