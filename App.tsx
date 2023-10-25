import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RecoilRoot, atom, useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from './src/Navigation/Navigation';

export default function AppRecoilWrapper() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

export function App() {

  const [userToken, setUserToken] = useRecoilState(userTokenAtom)

  useEffect(() => {
    getUserToken();
  }, [])

  const getUserToken = async () => {
    // get Token from Storage
    try {
      const data = await AsyncStorage.getItem('userToken');
      if (data !== null) {
        setUserToken(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
}

export const userTokenAtom = atom({
  key: 'userTokenAtom',
  default: '',
  dangerouslyAllowMutability: false,
});
