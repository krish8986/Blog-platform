import axios from 'axios';
// 
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';
// 
const API_URL = 'http://localhost:8000';
// 
const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout: 10000,
    headers: {
        "content-type": "application/json"
    } 
})

axiosInstance.interceptors.request.use(
    function (config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params;
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    function (response) {
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }
)
// 
// 
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    }else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

const processError = (error) => {
    if (error.response) {
        console.log('Error in response: ',error.toJSON());
        return {
            isError: true,
            msg: `${API_NOTIFICATION_MESSAGE.responseFailure}: ${error.response.data?.message || 'No specific error message provided'}`,
            code: error.response.status
        }
    }else if (error.request) {
        console.log('Error in request: ',error.toJSON());
        return{
            isError: true,
            msg: `${API_NOTIFICATION_MESSAGE.requestFailure}: Request was made but no response received`,
            code:""
        }
    }else{
        console.log('Error in network: ',error.toJSON());
        return{
            isError: true,
            msg: `${API_NOTIFICATION_MESSAGE.networkError}: Could not connect to the server`,
            code: ""
        }
    }
}
// 
const API = {};
// 
for (const [key,value] of Object.entries(SERVICE_URLS)) {
    API[key] = async (body, showUploadProgress, showDownloadProgress) => {
        console.log(`making ${value.method} request to ${value.url} with body:`, body);
        try {
        const response = await axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE: getType(value, body),
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        });
        console.log('API Response:' , response);
        return response;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
}
}
 export { API };

