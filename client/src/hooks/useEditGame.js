import { useContext, useEffect } from 'react';
import { putGame } from '../api/apiGames';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useEditGame(updateGame, setUpdateGame){
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();

            const editGame = async () => {
                const response_object = await putGame(updateGame.appID, {main:updateGame.main, dlc:updateGame.dlc}, user.token, source.token);
                if (response_object){
                    console.log('game has been updated');
                    setUpdateGame({appID:null, main:false, dlc:false});
                };
            };

            if(updateGame.main===true || updateGame.dlc===true){
                editGame();
            };

            return () => {
                source.cancel();
            };
        },
        [updateGame, setUpdateGame, user]
    );
};
