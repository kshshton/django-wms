
const get = async endpoint => await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    },
}).then(r => r.json());

export const products = await get('products');

export const sectors = await get('sectors');
