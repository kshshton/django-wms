import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from './ApiManager';

export const get_product = async productId => {
  try {
    const result = await ApiManager(`products/${productId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
      },
    });
    return result;
  } catch (_err) {
    console.error(_err);
  }
};
