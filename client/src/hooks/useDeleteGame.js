import { useContext, useEffect } from 'react';
import { deleteGame } from '../api/apiGames';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useDeleteGame(deleteApp, setDeleteApp){
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();

            const removeGame = async () => {
                const response_object = await deleteGame(deleteApp, user.token, source.token);
                if(response_object){
                    console.log('game deleted');
                    setDeleteApp(null);
                };
            };

            if(deleteApp){
                removeGame();
            };

            return () => {
                source.cancel();
            };
        },
        [deleteApp, setDeleteApp, user]
    );
};
