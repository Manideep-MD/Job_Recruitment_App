import React from 'react';
import {ThemeProvider} from './src/theme/ThemeContext';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {AuthProvider} from './src/context/AuthContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <GestureHandlerRootView>
            <ThemeProvider>
              <SafeAreaProvider>
                <SafeAreaView style={{flex: 1}}>
                  <AppNavigation />
                  <Toast/>
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
