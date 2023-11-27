import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import QuantityChanger from '../QuantityChanger';
import styles from './styles';

const ProductList = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [checkedNames, setCheckedNames] = useState([]);
  const [itemQuantities, setItemQuantities] = useState({});

  const getProducts = async () => {
    return await fetch('http://192.168.0.167:8000/api/products', {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then(res => res.json())
      .catch(_err => console.error(_err));
  };

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProducts();
      setData(products);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const handleCheckboxChange = id => {
    const newCheckedNames = [...checkedNames];
    const index = newCheckedNames.indexOf(id);

    if (index !== -1) {
      newCheckedNames.splice(index, 1);
    } else {
      newCheckedNames.push(id);
    }

    setCheckedNames(newCheckedNames);
  };

  const handleQuantityChange = (value, item) => {
    setItemQuantities(prevQuantities => ({
      ...prevQuantities,
      [item.id]: {quantity: value},
    }));
  };

  const handleSubmit = () => {
    const checkedProducts = data.filter(item => checkedNames.includes(item.id));
    const products = checkedProducts.map(product => ({
      ...product,
      quantity:
        (itemQuantities[product.id] && itemQuantities[product.id].quantity) ||
        1,
    }));

    navigation.navigate('Dane osobowe', {products});
  };

  const renderItem = ({item}) => (
    <View key={item} style={styles.itemsContainer}>
      <CheckBox
        isChecked={checkedNames.includes(item.id)}
        onClick={() => handleCheckboxChange(item.id)}
      />
      <QuantityChanger
        value={(itemQuantities[item] && itemQuantities[item].quantity) || 1}
        onChange={value => handleQuantityChange(value, item)}
        minValue={1}
        maxValue={item.quantity}
      />
      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.itemContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button title="Wybierz" onPress={handleSubmit} />
    </View>
  );
};

export default ProductList;
