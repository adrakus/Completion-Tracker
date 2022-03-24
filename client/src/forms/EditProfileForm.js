import { useState, useContext } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import MyButton from '../components/MyButton';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AppContext } from '../context/AppContext';
import useEditProfile from '../hooks/useEditProfile';
import useDeleteUser from '../hooks/useDeleteUser';

const FormSchema = Yup.object(
    {
        first_name : Yup.string().required('Required'),
        last_name : Yup.string().required('Required'),
        email : Yup.string().email('Must be a valid e-mail address!').required('Required'),
        password : Yup.string().required('Required')
    }
);
  
export default function ProfileForm(){
    const [profileData, setProfileData] = useState();
    const [clickDelete, setDelete] = useState(false);
    const {user} = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEditProfile(profileData, setProfileData);
    useDeleteUser(clickDelete);

    const initialValues = {
      first_name : profileData?.first_name ?? user.first_name,
      last_name : profileData?.last_name ?? user.last_name,
      email : profileData?.email ?? user.email,
      password : ''
    };

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

    const handleSubmit = (values, resetForm) => {
      setProfileData(values);
      resetForm(initialValues);
    };

    const handleDelete = () => {
      setDelete(true);
    };

    const formik = useFormik(
        {
            initialValues : initialValues,
            validationSchema : FormSchema,
            onSubmit : (values, {resetForm}) => {handleSubmit(values, resetForm)},
            enableReinitialize : true
        }
    );
    
    return(
        <> 
            <form onSubmit={formik.handleSubmit}>
                <h1>Edit Profile</h1>
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
            <MyButton type="submit" sx={{width:"100%", mt: 3}} onClick={handleOpen}>Delete</MyButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {!clickDelete ?
                        <>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Confirm Account Deletion:
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <MyButton type="submit" sx={{width:"100%", mt: 3}} onClick={handleDelete}>Yes</MyButton>
                                <MyButton type="submit" sx={{width:"100%", mt: 3}} onClick={handleClose}>No</MyButton>
                            </Typography>
                        </>
                    :
                        <Typography 
                            id="modal-modal-description" 
                            variant="h5" 
                            sx={{mt: 2, display: "flex", alignItems: "center", justifyContent: "center"}}
                        >
                            Deleting Account<CircularProgress sx={{ml: 3}}/>
                        </Typography>
                    }
                </Box>
            </Modal>
        </>
    );
};
