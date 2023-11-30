import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {get_product} from '../../services/get_product';
import styles from './styles';

const Product = ({route}) => {
  const [product, setProduct] = useState([]);
  const {productId} = route.params;

  const getProduct = async () => {
    const {data} = await get_product(productId);
    setProduct(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemList}>
        <Text style={styles.itemText}>ID: {item.id}</Text>
        <Text style={styles.itemText}>Nazwa: {item.name}</Text>
        <Text style={styles.itemText}>Kategoria: {item.category}</Text>
        <Text style={styles.itemText}>Ilość: {item.quantity}</Text>
        <Text style={styles.itemText}>Sektor: {item.sectorName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={product}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default Product;
