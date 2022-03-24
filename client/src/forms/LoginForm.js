import {useContext, useState} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MyButton from '../components/MyButton';
import MyLink from '../components/MyLink';
import { AppContext } from '../context/AppContext';
import useLogin from '../hooks/useLogin';
import useGetGames from '../hooks/useGetGames';

const FormSchema = Yup.object(
    {
        email : Yup.string().email('Must be a valid e-mail address!').required('Required'),
        password : Yup.string().required('Required')
    }
);

const initialValues = {
    email : '',
    password : ''
};

export default function LoginForm() {

    const {setUser, setGames}  = useContext(AppContext);
    const [loginCreds, setLoginCreds] = useState({});
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(false);

    useGetGames(setGames, setError, update, setUpdate);
    useLogin(loginCreds, setError, setUser, setLoginCreds, setUpdate);

    const handleSubmit = (values) => {
        setLoginCreds(values);
    };

    const formik = useFormik(
        {
            initialValues : initialValues,
            validationSchema : FormSchema,
            onSubmit : (values) => {handleSubmit(values)}
        }
    );

    return(
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <form onSubmit={formik.handleSubmit} > 
                <h1>Login</h1>
                <TextField 
                    fullWidth
                    sx = {{mb: 2, mt: 2}}
                    id = "email"
                    name = "email"
                    type = "text"
                    label = "Email"
                    placeholder = "Email"
                    value = {formik.values.email}
                    onChange = {formik.handleChange}
                    error = {formik.touched.email && Boolean(formik.errors.email)}
                    helperText = {formik.touched.email && formik.errors.email} 
                />
                <TextField 
                    fullWidth
                    sx = {{mb: 2, mt: 2}}
                    id = "password"
                    name = "password"
                    type = "password"
                    label = "Password"
                    placeholder = "Password"
                    value = {formik.values.password}
                    onChange = {formik.handleChange}
                    error = {formik.touched.password && Boolean(formik.errors.password)}
                    helperText = {formik.touched.password && formik.errors.password} 
                />
                <MyButton type="submit" sx={{width:"100%"}}>Login</MyButton>
                <Typography sx={{color: 'red', marginTop: "10px"}}>{error}</Typography>
            </form>
            <Typography sx={{alignSelf: "center", marginTop:"10px"}}>
                New User? 
                <MyLink to="/register" style={{marginLeft:"5px"}}>
                    Register
                </MyLink>
            </Typography>
        </Box>
    );
};
