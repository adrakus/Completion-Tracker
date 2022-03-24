import { useContext, useEffect } from 'react';
import { postGames } from '../api/apiGames';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useAddGames(games, clickAdd, setAdd, setUpdate){
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();

            const addGames = async () => {
                const response_object = await postGames({'games' : games}, user.token, source.token);
                if (response_object){
                    console.log('games added');
                    setAdd(false);
                    setUpdate(true);
                };
            };

            if (clickAdd){
                addGames();
            };

            return () => {
                source.cancel();
            };
        },
        [games, clickAdd, setAdd, setUpdate, user]
    );
};
