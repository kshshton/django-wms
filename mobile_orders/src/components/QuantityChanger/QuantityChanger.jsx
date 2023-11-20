import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const QuantityChanger = ({value, onChange, minValue, maxValue}) => {
  const [quantity, setQuantity] = useState(value);

  const handleQuantityChange = newQuantity => {
    if (newQuantity >= minValue && newQuantity <= maxValue) {
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleQuantityChange(quantity - 1)}>
        <Text style={styles.leftButton}>{'<'}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.quantityText}
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={text => handleQuantityChange(parseInt(text, 10) || 0)}
      />

      <TouchableOpacity onPress={() => handleQuantityChange(quantity + 1)}>
        <Text style={styles.rightButton}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuantityChanger;
