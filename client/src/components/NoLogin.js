import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

export default function NoLogin({children, redirectTo}){
    const {user, games} = useContext(AppContext);

    return user?.token && Object.keys(games).length>0 ? <Navigate to={redirectTo}/> : children;
};
