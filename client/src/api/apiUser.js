import apiClientNoAuth from './clientNoAuth';
import apiClientTokenAuth from './clientTokenAuth';

const endpoint = '/api/user';

//NO AUTH

//Registers new user
export const postUser = async (data, cancelToken) => {
    const response = await apiClientNoAuth(cancelToken).post(endpoint, data);
    
    return response.ok;
};

//TOKEN AUTH

//Edits user's profile
export const putUser = async (data, token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).put(endpoint, data);

    return response.ok;
};

//Deletes user
export const deleteUser = async (token, cancelToken) => {
    const response = await apiClientTokenAuth(token, cancelToken).delete(endpoint);

    return response.ok;
};
