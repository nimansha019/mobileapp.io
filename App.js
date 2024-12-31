// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import { createStackNavigator } from '@react-navigation/stack'; 
import LoginScreen from './screens/LoginScreen'; 
import HomeScreen from './screens/HomeScreen'; 
import SignupScreen from './screens/SignupScreen';  // Import the SignupScreen
import TitleScreen from './screens/TitleScreen';  // Import the TitleScreen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen name="Title" component={TitleScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
