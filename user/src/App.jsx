import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './components/Login';
import Order from './components/Order';
import Orders from './components/Orders';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Zamówienia" component={Orders} />
        <Stack.Screen name="Zamówienie" component={Order} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
