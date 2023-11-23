import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductList} from './components/ProductList';
import {CustomerForm} from './components/CustomerForm';
import {AddressForm} from './components/AddressForm';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="Produkty" component={ProductList} />
        <Stack.Screen name="Dane osobowe" component={CustomerForm} />
        <Stack.Screen name="Adres" component={AddressForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
