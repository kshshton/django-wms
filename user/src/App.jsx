import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Login from './components/Login';
import Order from './components/Order';
import Orders from './components/Orders';
import Scanner from './components/Scanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Order" component={Order} />
    </Stack.Navigator>
  );
};

const ScannerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Scanner">
      <Stack.Screen name="Scanner" component={Scanner} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Zamówienia">
        <Tab.Screen name="Zamówienia" component={OrderStack} />
        <Tab.Screen name="Skaner" component={ScannerStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
