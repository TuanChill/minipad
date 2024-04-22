import axios from "axios";

const lrvInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },
    transformResponse: function (data) {
        return data.data;
    }
})

export {
    lrvInstance
}