import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const {setUser, setGames} = useContext(AppContext);
    let navigate = useNavigate();

    useEffect(
        () => {
            const logout = () => {
                setUser({});
                setGames({});
                navigate('/login');
            };

            logout();

            return () => {};
        },
        [setUser, setGames, navigate]
    );
    
    return(
        <></>
    );
};
