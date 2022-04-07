import { create } from 'apisauce';

const apiClient = (cancelToken) => create(
    {
        baseURL : 'https://api.steampowered.com',
        cancelToken
    }
);

export default apiClient;
