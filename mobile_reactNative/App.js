import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {StatusBar} from 'react-native'
import Home from './src/pages/Home'
import GitProfile from './src/pages/GitProfile'

const Stack = createStackNavigator();

export default function App() {

  return (
    <>
    <StatusBar barStyle='light-content'/>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'rgba(0,0,0,0.7)'}, headerTintColor:'#fff'}}>
            <Stack.Screen 
              name="Home" 
              component={Home} 
              options={
                {
                  title: 'Finder',
                  headerTitleAlign:'center',
                  headerShown:false
                }
              } />
            <Stack.Screen 
              name="GitProfile" 
              component={GitProfile} 
              options={
                {
                  title: 'GitHub Profile',
                  headerTitleAlign:'center' 
                }
              } />
        </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}

