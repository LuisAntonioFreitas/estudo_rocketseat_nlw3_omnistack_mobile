import React from 'react';

import {NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen 
          name="OrphanagesMap" 
          component={OrphanagesMap}
          options={{ headerShown: false }} />
        <Screen 
          name="OrphanageDetails" 
          component={OrphanageDetails}
          options={{ headerShown: true }} />
      </Navigator>
    </NavigationContainer>
  )
}