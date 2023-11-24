import ApiManager from './ApiManager';

export const user_login = async data => {
  try {
    const result = await ApiManager('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (_err) {
    console.error(_err);
  }
};
