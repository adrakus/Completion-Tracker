import { create } from 'apisauce';

const apiClient = (cancelToken) => create(
    {
        baseURL : 'http://api.steampowered.com',
        cancelToken
    }
);

export default apiClient;
