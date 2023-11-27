import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import AddressForm from './components/AddressForm';
import CustomerForm from './components/CustomerForm';
import ProductList from './components/ProductList';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Produkty">
        <Stack.Screen name="Produkty" component={ProductList} />
        <Stack.Screen name="Dane osobowe" component={CustomerForm} />
        <Stack.Screen name="Adres" component={AddressForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
