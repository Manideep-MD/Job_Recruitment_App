import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tokenReducer from '../reducers/tokenReducer';
import savedJobsReducer from '../reducers/savedJobsReducer';
import userReducer from '../reducers/userReducer';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['loginToken', 'isProfileCompleted'],
};

const jobsPersistConfig = {
  key: 'savedJobs',
  storage: AsyncStorage,
  whitelist: ['jobs'],
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['name', 'dob', 'email', 'mobile', 'gender', 'countryCode', 'profile_img'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, tokenReducer),
  savedJobs: persistReducer(jobsPersistConfig, savedJobsReducer),
  user: persistReducer(userPersistConfig, userReducer),
});

const axiosMiddleware = (store: any) => (next: any) => async (action: any) => {
  // let token = store.getState()?.auth?.loginToken;

  // if (!token) {
  //   token = await AsyncStorage.getItem('userToken');
  // }

  // if (token) {
  //   apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
  // } else {
  //   delete apiClient.defaults.headers.common['Authorization'];
  // }

  return next(action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(axiosMiddleware),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
