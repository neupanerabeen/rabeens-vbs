import React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllRequests } from './AllRequests';
import { Holidays } from './Holidays';

const Stack = createNativeStackNavigator();


export const Admin = props =>{
    return  <Stack.Navigator
        initialRouteName="MyRequests"
    >
      <Stack.Screen name="AllRequests" component={AllRequests} />
      <Stack.Screen name="Holidays" component={Holidays} />
    </Stack.Navigator>
    
}