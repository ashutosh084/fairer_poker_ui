import axios from 'axios';

export const prepareTargetUrl = (url) => {
    if (process.env.NODE_ENV === 'development') {
        return `http://localhost:8080${url}`;
    }
    return url;
};

/**
 * Generalized function to make network requests using Axios.
 */
export const makeNetworkRequest = async (url, method = 'GET', data = null, config = {}) => {

    const response = await axios({
        url: prepareTargetUrl(url),
        method,
        data,
        ...config
    });
    return response.data;
};