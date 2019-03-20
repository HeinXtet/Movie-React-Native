import axios from 'axios';
import { AsyncStorage } from 'react-native'
/**
 * Request Wrapper with default success/error actions
 */

let baseURL = 'https://api.themoviedb.org/3'


const request = async function (options, isHeader = false) {

    let authHeader = null;
    if (isHeader) {
        authHeader = await AsyncStorage.getItem("Auth"); /// Add header
    }

    const client = axios.create({
        baseURL: baseURL,
//        headers: { 'Authorization': authHeader },

    });

    const onSuccess = function (response) {

        console.debug('Request Successful!', response);
        return response.data;
    }

    const onError = function (error) {
        console.log('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.log('Status:', error.response.status);
            console.log('Data:', error.response.data);
            console.log('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.log('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }


    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;