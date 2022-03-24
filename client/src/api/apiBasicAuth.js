import apiClientBasicAuth from './clientBasicAuth';

const endpoint = '/api/login';

//BASIC AUTH

//Logs in user
export const getUser = async (email, password, cancelToken) => {
    let error;
    let user;

    const response = await apiClientBasicAuth(email, password, cancelToken).get(endpoint);
    if (response.ok){
        user = response.data;
    }
    else if (response.status===401){
        error = 'Invalid Email/Password combo';
    }else{
        error = 'An unexpected error has occured. Please try again later.';
    };

    return{
        error,
        user
    };
};
