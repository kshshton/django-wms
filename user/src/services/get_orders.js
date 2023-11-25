import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const get_orders = async () => {
  try {
    const result = await ApiManager(
      `user/${await AsyncStorage.getItem('userId')}/orders`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
        },
      },
    );
    return result;
  } catch (_err) {
    console.error(_err);
  }
};
