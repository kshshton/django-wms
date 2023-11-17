import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import CheckBox from 'react-native-check-box';

const ProductList = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [checkedNames, setCheckedNames] = useState([]);
  // const navigation = useNavigation();

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

  const handleSubmit = () => {
    const products = data.filter(item => checkedNames.includes(item.id));
    navigation.navigate('Dane osobowe', {products});
  };

  const renderItem = ({item}) => (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginVertical: 5}}>
      <CheckBox
        isChecked={checkedNames.includes(item.id)}
        onClick={() => handleCheckboxChange(item.id)}
      />
      <Text style={{marginLeft: 10}}>{item.name}</Text>
    </View>
  );

  return (
    <View style={{flex: 1, padding: 20}}>
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
