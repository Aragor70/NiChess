import axios from 'axios';

const setAuthToken = (token: string) => {

    if (token) {
        axios.defaults.withCredentials = true
        return axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        axios.defaults.withCredentials = true
        return axios.defaults.headers.common['Authorization']
    }
}
export default setAuthToken;