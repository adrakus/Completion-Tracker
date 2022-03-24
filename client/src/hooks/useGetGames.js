import { useContext, useEffect } from 'react';
import { getGames } from '../api/apiGames';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function useGetGames(setGames, setError, update, setUpdate){
    const {user} = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(
        () => {
            const source = CancelToken.source();

            const retrieveGames = async () => {
                const response_object = await getGames(user.token, source.token);
                if (response_object.games){
                    console.log('games retrieved');
                    setUpdate(false);
                    setGames(response_object.games);
                    setError(response_object.error);
                    navigate('/games');
                }
                else{
                    setError(response_object.error);
                };
            };

            if(update){
                console.log(update);
                retrieveGames();
            };

            return () => {
                source.cancel();
            };
        },
        [update, setUpdate, setGames, setError, user, navigate]
    );
};
