
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {  StatusBar } from 'react-native';
import Routes from './src/routes';
import 'react-native-gesture-handler';






export default function App() {


 return (
  <NavigationContainer>
 <Routes/>
     <StatusBar backgroundColor="#131313" barStyle="light-content"/>
    
 
  </NavigationContainer>
  );
}
