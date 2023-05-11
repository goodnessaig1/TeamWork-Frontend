import axios from 'axios';

// const baseURL = 'https://teamwork-nodejs.onrender.com/';
const baseURL = 'http://localhost:3001/';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    //  "Content-Type": "multipart/form-data",
    Accept: 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export async function apiRequest(method, path, data, headers = defaultHeaders) {
    try {
        let url = `${baseURL}${path}`;
        const request = await axios({
            method: method,
            url: url,
            data: data,
            headers: {
                ...headers,
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return request;
    } catch (error) {
        throw new Error(error);
    }
}
