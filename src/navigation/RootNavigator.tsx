// src/navigation/RootNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BiometricScreen from '../screens/BiometricScreen';
import MarketOverviewScreen from '../screens/MarketOverviewScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export type RootStackParamList = {
  Biometric: undefined;
  MarketOverview: undefined;
  CoinDetailScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
 <GestureHandlerRootView style={{flex:1}}>
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Biometric" component={BiometricScreen} />
      <Stack.Screen name="MarketOverview" component={MarketOverviewScreen} />
      <Stack.Screen name="CoinDetailScreen" component={CoinDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  </GestureHandlerRootView>
);

export default RootNavigator;
