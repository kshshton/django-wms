import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {get_orders} from '../../services/get_orders';
import styles from './styles';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const {data} = await get_orders();
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const navigateToOrder = orderId => {
    navigation.navigate('Order', {orderId});
  };

  return (
    <View style={styles.container}>
      {orders.map(order => (
        <TouchableOpacity
          key={order.id}
          onPress={() => navigateToOrder(order.id)}
          style={styles.orderBtn}>
          <Text style={styles.loginText}>{order.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Orders;
