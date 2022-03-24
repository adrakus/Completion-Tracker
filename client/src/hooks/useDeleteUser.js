import { useContext, useEffect } from 'react';
import { deleteUser } from '../api/apiUser';
import { CancelToken } from 'apisauce';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function useDeleteUser(clickDelete){
    let navigate = useNavigate()
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();
            
            const removeUser = async () => {
                const response_object = await deleteUser(user.token, source.token);
                if (response_object){
                    console.log('user deleted');
                    navigate('/logout');
                };
            };

            if (clickDelete){
                removeUser();
            };

            return () => {
                source.cancel();
            };
        },
        [clickDelete, navigate, user]
    );
};
