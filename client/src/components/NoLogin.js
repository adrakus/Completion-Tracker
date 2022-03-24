import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';

export default function NoLogin({children, redirectTo}){
    const {user} = useContext(AppContext);

    return user?.token ? <Navigate to={redirectTo}/> : children;
};