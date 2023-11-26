import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {get_orders} from '../../services/get_orders';
import style from './style';

const Orders = ({navigation}) => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    const {data} = await get_orders().catch(_err => console.error(_err));
    setOrders(data);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const navigateToOrder = orderId => {
    navigation.navigate('Zamówienie', {orderId});
  };

  return (
    <View style={style.container}>
      {orders.map(order => (
        <TouchableOpacity
          key={order.id}
          onPress={() => navigateToOrder(order.id)}
          style={style.orderBtn}>
          <Text style={style.loginText}>{order.id}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Orders;
