import { useEffect } from 'react';
import { getUser } from '../api/apiBasicAuth';
import { CancelToken } from 'apisauce';

export default function useLogin(loginCreds, setError, setUser, setLoginCreds, setUpdate){
    useEffect(
        () => {
            const source = CancelToken.source();

            const login = async () => {
                const response_object = await getUser(loginCreds.email, loginCreds.password, source.token);
                if (response_object.user?.token){
                    console.log('logged in');
                    setLoginCreds({});
                    setUser(response_object.user);
                    setUpdate(true);
                    setError(response_object.error);
                }
                else{
                    setError(response_object.error);
                };
            };

            if (loginCreds.email && loginCreds.password){
                login()
            };

            return () => {
                source.cancel();
            };
        },
        [loginCreds, setLoginCreds, setUser, setError, setUpdate]
    );
};
