import {Alert, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {useEffect, useState} from 'react';
import CheckBox from 'react-native-check-box';
import {colors} from '../../config/colors';

const ProductList = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.formContainer}>
        <Text style={styles.title}>Produkty</Text>
        {data.map((value, id) => (
          <View style={styles.inputWrapper}>
            <Product id={id} data={value} />
          </View>
        ))}
        <TouchableOpacity
          onPress={() => Alert.alert()}
          style={[styles.submitBtn, {backgroundColor: colors.gray}]}>
          <Text style={styles.submitBtnTxt}>Dalej</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Product = ({id, data}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => {
    const checkboxValue = !isChecked;
    setIsChecked(checkboxValue);

    console.log(checkboxValue);
  };

  return (
    <View style={styles.inputWrapper} key={id}>
      <View style={styles.checkboxWrapper}>
        <CheckBox isChecked={isChecked} onClick={handleCheckboxToggle} />
      </View>
      <Text style={styles.inputStyle}>{data.name}</Text>
    </View>
  );
};

export default ProductList;
