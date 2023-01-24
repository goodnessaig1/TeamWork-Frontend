import axios from 'axios';

const baseURL = 'https://teamwork-nodejs.onrender.com/';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    //  "Content-Type": "multipart/form-data",
    Accept: 'multipart/form-data',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export async function apiRequest(method, path, data, headers) {
    try {
        let url = `${baseURL}${path}`;
        const request = await axios({
            method: method,
            url: url,
            data: data,
            headers: (headers = defaultHeaders),
        });
        return request;
    } catch (error) {
        throw new Error(error);
    }
}
