import { useEffect } from 'react';
import { postUser } from '../api/apiUser';
import { CancelToken } from 'apisauce';
import { useNavigate } from 'react-router-dom';

export default function useRegister(profileData, setProfileData){
    let navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();

            const register = async () => {
                const response_object = await postUser(profileData, source.token);
                if (response_object){
                    console.log('registered');
                    navigate('/login');
                };
            };

            if (profileData){
                register();
            };

            return () => {
                source.cancel();
            };
        },
        [profileData, setProfileData, navigate]
    );
};
