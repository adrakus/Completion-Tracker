import { useEffect, useContext } from 'react';
import { getAchievements } from '../api/apiSteam';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useGetAchievements(appID, setAchievements, setAppID, setError){
    const {user} = useContext(AppContext);
    
    useEffect(
        () => {
            const source = CancelToken.source();

            const retrieveAchievements = async () => {
                const response_object = await getAchievements(user.steam_id, appID, source.token);
                if (response_object){
                    setAchievements(response_object.achievements);
                    setError(response_object.error);
                    setAppID('');
                }
                else{
                    setError(response_object.error);
                };
            };

            if(appID){
               retrieveAchievements();
            };

            return () => {
                source.cancel();
            };
        },
        [appID, setAchievements, setAppID, setError, user]
    );
};
