import fetch from 'isomorphic-fetch';

export async function sendForm(data: Object, csrfToken: string): Promise<Object> {
    return await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({ data })
    })
    .then(response => response.json());
}
