const primaryUrl = 'http://127.0.0.1:8000';

export function customFetch(method, body, secondaryUrl, endpoint, token) {
    return fetch(`${primaryUrl}/${secondaryUrl}/${endpoint}/`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
    })
}