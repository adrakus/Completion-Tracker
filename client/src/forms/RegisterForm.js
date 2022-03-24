import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MyButton from '../components/MyButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useRegister from '../hooks/useRegister';

const FormSchema = Yup.object(
    {
        'first_name' : Yup.string().required('Required'),
        'last_name' : Yup.string().required('Required'),
        email : Yup.string().email('Must be a valid e-mail address!').required('Required'),
        'steam_id' : Yup.string().required('Required'),
        password : Yup.string().required('Required')
    }
);

const initialValues = {
    first_name : '',
    last_name : '',
    email : '',
    steam_id : '',
    password : ''
};
  
export default function ProfileForm(){
    const [profileData, setProfileData] = useState();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    useRegister(profileData, setProfileData);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleSubmit = (values) => {
        setProfileData(values);
    };

    const formik = useFormik(
        {
            initialValues: initialValues,
            validationSchema : FormSchema,
            onSubmit : (values) => {handleSubmit(values)}
        }
    );
    
    return(
        <form onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            <TextField 
                fullWidth
                sx = {{mb: 2, mt: 2}}
                id = "first_name"
                name = "first_name"
                type = "text"
                label = "First Name"
                placeholder = "First Name"
                value = {formik.values.first_name}
                onChange = {formik.handleChange}
                error = {formik.touched.first_name && Boolean(formik.errors.first_name)}
                helperText = {formik.touched.first_name && formik.errors.first_name} 
            />
            <TextField 
                fullWidth
                sx = {{mb: 2, mt: 2}}
                id = "last_name"
                name = "last_name"
                type = "text"
                label = "Last Name"
                placeholder = "Last Name"
                value = {formik.values.last_name}
                onChange = {formik.handleChange}
                error = {formik.touched.last_name && Boolean(formik.errors.last_name)}
                helperText = {formik.touched.last_name && formik.errors.last_name} 
            />
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
                sx = {{mb: 1, mt: 2}}
                id = "steam_id"
                name = "steam_id"
                type = "text"
                label = "SteamID"
                placeholder = "SteamID"
                value = {formik.values.steam_id}
                onChange = {formik.handleChange}
                error = {formik.touched.steam_id && Boolean(formik.errors.steam_id)}
                helperText = {formik.touched.steam_id && formik.errors.steam_id} 
            />
            <MyButton onClick={handleOpen} sx={{fontSize: 12, ml: 0.5, textTransform: 'none'}}>SteamID?</MyButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        How to find SteamID?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <List>
                            <ListItem>
                                <ListItemText>Step 1: Open up Steam</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Step 2: Go to Account Details</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText>Step 3: Copy SteamID</ListItemText>
                            </ListItem>
                        </List>
                    </Typography>
                </Box>
            </Modal>
            <TextField 
                fullWidth
                sx = {{mb: 2, mt: 1}}
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
            <MyButton type="submit" sx={{width:"100%"}}>Submit</MyButton>
        </form>
    );
};
