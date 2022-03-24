import { useEffect, useContext } from 'react';
import { getLibrary } from '../api/apiSteam';
import { CancelToken } from 'apisauce';
import { AppContext } from '../context/AppContext';

export default function useSteamLibrary(library, setError, setLibrary){
    const {user} = useContext(AppContext);

    useEffect(
        () => {
            const source = CancelToken.source();

            const steamLibrary = async () => {
                const response_object = await getLibrary(user.steam_id, source.token);
                if (response_object){
                    console.log('library retrieved')
                    response_object.games.sort((left, right) => {
                            let _left = (() => {
                                if(left.name.slice(0, 4)==='The '){
                                   return left.name.slice(4);
                                }
                                else if(left.name.slice(0, 2)==='A '){
                                    return left.name.slice(2);
                                }
                                else{ 
                                    return left.name;
                                };
                            });
                            let _right = (() => {
                                if(right.name.slice(0, 4)==='The '){
                                   return right.name.slice(4);
                                }
                                else if(right.name.slice(0, 2)==='A '){
                                    return right.name.slice(2);
                                }
                                else{ 
                                    return right.name;
                                };
                            });
                            return _left().toLowerCase() < _right().toLowerCase() ? -1 : 1;
                        }
                    );
                    setLibrary(response_object.games.map(game => {
                        return {
                            appID : game.appid,
                            icon : game.img_icon_url,
                            name : game.name,
                            playtime : game.playtime_forever
                        };

                    }));
                    setError(response_object.error);
                }
                else{
                    console.log('error in steamlibrary 2')
                    setError(response_object.error);
                };
            };

            if(library.length===0){
                steamLibrary();
            };

            return () => {
                source.cancel();
            };
        },
        [library, setError, setLibrary, user]
    );
};
