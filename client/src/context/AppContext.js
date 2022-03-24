import { createContext, useState, useEffect} from 'react';

export const AppContext = createContext();

const AppContextProvider = ({children})=>{

    const getUserFromLS = () => {
        let user = localStorage.getItem('user');
        if (user){
            return JSON.parse(user);
        };
    };

    const getGamesFromLS = () => {
        let games = localStorage.getItem('games');
        if (games){
            return JSON.parse(games);
        };
        return []
    };

    const [user, _setUser] = useState(getUserFromLS());
    const [games, _setGames] = useState(getGamesFromLS());

    useEffect(
        () => {
            localStorage.setItem('games', JSON.stringify(games));
        },
        [games]
    );

    const values = {
        user,
        setUser : (user) => {
            localStorage.setItem('user', JSON.stringify(user));
            _setUser(user);
        },
        games,
        setGames : (games) => {
            localStorage.setItem('games', JSON.stringify(games));
            _setGames(games);
        }
    };

    return(
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
