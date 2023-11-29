import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {colors} from '../../config/colors';
import {user_login} from '../../services/user_login';
import styles from './styles';

const Login = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const onPressLogin = async () => {
    await user_login({
      email: data.email,
      password: data.password,
    }).then(res => {
      if (res.status === 200) {
        AsyncStorage.setItem('accessToken', res.data.tokens.accessToken);
        AsyncStorage.setItem('refreshToken', res.data.tokens.refreshToken);
        AsyncStorage.setItem('userId', res.data.userId);
        navigation.navigate('Orders');
      }
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor={colors.lightBlue}
          onChangeText={text =>
            setData(prevState => ({...prevState, email: text}))
          }
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={colors.lightBlue}
          onChangeText={text =>
            setData(prevState => ({...prevState, password: text}))
          }
        />
      </View>
      <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
