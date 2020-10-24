import React from 'react';
import sessionConfig from "react-native-config";

import { useFonts } from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import env from './src/env';
import Routes from './src/routes';

// Define variáveis de ambiente
env;
//alert(process.env['NODE_ENV']);
//alert(sessionConfig.REACT_APP_BASE_URL);

export default function App() {
  const [fontsLoaded] = useFonts({
    nunito600: Nunito_600SemiBold, 
    nunito700: Nunito_700Bold,
    nunito800: Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Routes />
  );
};

// const styles = StyleSheet.create({

// });