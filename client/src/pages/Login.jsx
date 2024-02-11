import MenuBook from '@mui/icons-material/MenuBook';
import React from 'react';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, FormControlLabel, Checkbox, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations'
import { useState } from 'react';
import Auth from '../utils/auth'

const Login = ({ open, onClose }) => {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error, data }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        })
    }
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState)
        try {
            const { data } = await login({
                variables: { ...formState },
            })
            Auth.login(data.login.token)
        } catch (error) {
            console.error(error);
        }
        setFormState({
            email: '',
            password: '',
        });
    };

    const paperStyle = {
        padding: 20,
        height: '70vh',
        width: 400,
        margin: "20px auto",
        position: 'relative',
        overflow: 'auto',
        backgroundColor: '#f3f3ec'
    };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnStyle = { margin: '8px 0', backgroundColor: '#8abbb1' };
    const textFieldStyle = { marginBottom: '16px' };

    // modify outline of textfield
    const customTheme = (outerTheme) =>
        createTheme({
            palette: {
                mode: outerTheme.palette.mode,
            },
            components: {
                MuiTextField: {
                    styleOverrides: {
                        root: {
                            '--TextField-brandBorderColor': '#E0E3E7',
                            '--TextField-brandBorderHoverColor': '#B2BAC2',
                            '--TextField-brandBorderFocusedColor': '#6F7E8C',
                            '& label.Mui-focused': {
                                color: 'var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiOutlinedInput: {
                    styleOverrides: {
                        notchedOutline: {
                            borderColor: 'var(--TextField-brandBorderColor)',
                        },
                        root: {
                            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: 'var(--TextField-brandBorderHoverColor)',
                            },
                            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                                borderColor: 'var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiFilledInput: {
                    styleOverrides: {
                        root: {
                            '&::before, &::after': {
                                borderBottom: '2px solid var(--TextField-brandBorderColor)',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                            },
                            '&.Mui-focused:after': {
                                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
                MuiInput: {
                    styleOverrides: {
                        root: {
                            '&::before': {
                                borderBottom: '2px solid var(--TextField-brandBorderColor)',
                            },
                            '&:hover:not(.Mui-disabled, .Mui-error):before': {
                                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
                            },
                            '&.Mui-focused:after': {
                                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
                            },
                        },
                    },
                },
            },
        });

    const outerTheme = useTheme();

    return (
        <Modal open={open} onClose={onClose}>
            <form onSubmit={handleFormSubmit}>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                    <Paper elevation={10} style={paperStyle}>
                        <IconButton
                            onClick={onClose}
                            style={{ position: 'absolute', right: '8px', top: '8px', zIndex: 1, color: 'black' }}
                        >

                            <CloseIcon color="action" className='close' sx={{ color: 'black' }} />
                        </IconButton>
                        <Grid align='center'>
                            <Avatar style={{ backgroundColor: '#8abbb1' }}>
                                <MenuBook style={{ color: 'black' }} />
                            </Avatar>
                            <Typography variant="h5" sx={{ color: 'darkslategray', margin: '8px 0' }}>
                                Log In
                            </Typography>

                        </Grid>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <TextField
                            className='search-input'
                                label='Email'
                                name='email'
                                placeholder='Enter Email'
                                variant="outlined"
                                fullWidth
                                required
                                style={textFieldStyle}
                                onChange={handleChange}
                            />
                            <TextField
                            className='search-input'
                                label='Password'
                                name='password'
                                placeholder='Enter password'
                                type='password'
                                variant="outlined"
                                fullWidth
                                required
                                style={textFieldStyle}
                                onChange={handleChange}
                            />
                        </ThemeProvider>
                        {/* Bring this code back in if you can create the logic of actually making this work */}
                        {/* <FormControlLabel
                        control={<Checkbox name="checkedB" />}
                        label="Remember me"
                        sx={{ '& .MuiFormControlLabel-label': { color: '#333' } }}
                    /> */}
                        <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth>
                            Log in
                        </Button>
                        {/* Bring back in if you can create the logic to make it work */}
                        {/* <Typography>
                            <Link href="#" sx={{ color: 'darkslategray' }}>Forgot password?</Link>
                        </Typography> */}
                        <Typography sx={{ color: 'darkslategray' }}>
                            Do you have an account?&nbsp;
                            <Link component={RouterLink} to="/signup" onClick={onClose} sx={{ color: '#8abbb1', textDecoration: 'none' }}>
                                Sign Up
                            </Link>
                        </Typography>
                    </Paper>
                </Grid>
            </form>
        </Modal>
    );
};

export default Login;
