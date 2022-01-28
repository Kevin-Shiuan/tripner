import React, { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from '../graphql';
import { NavLink, useNavigate } from 'react-router-dom';
import {userContext, passwordContext, signInContext} from '../context/userContext';

function SignUp() {

    const [user, setUser] = useContext(userContext);
    const [password, setPassword] = useContext(passwordContext);
    const [signIn, setSignIn] = useContext(signInContext);

    const [ signingUp ] = useMutation(CREATE_USER_MUTATION);
    const [ errorMsg, setErrorMsg] = useState('');
    const [ password2, setPassword2] = useState('');

    const navigate = useNavigate();
    
    const handleSignUp = async()=>{
        // setErrorMsg('')
        if (password2!==password){
            setErrorMsg('Password not similar');
            return;
        }
        let {data:{createUser:{success, errorMessage}}} = await signingUp({
            variables:{
                name: user,
                password: password,
            }
        })
        if(success){
            setSignIn(true);
            navigate('/');
        }
        setErrorMsg(errorMessage);
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4, pb: 16 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography variant='h3'>Welcome to Tripner</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 1 }}>
                        <Typography>Already signed up?</Typography>
                        <Button
                        component={NavLink}
                        variant='outlined'
                        to={"/sign_in"}
                        >Sign In</Button>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Name</Typography>
                        <TextField 
                        id="outlined-basic" 
                        placeholder="Your name here..." 
                        margin="dense"
                        variant="outlined" 
                        defaultValue={user}
                        onChange={(e)=>setUser(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Password</Typography>
                        <TextField 
                        id="outlined-basic" 
                        placeholder="Password" 
                        margin="dense"
                        variant="outlined" 
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                        <TextField 
                        id="outlined-basic" 
                        placeholder="Confirm your password" 
                        margin="dense"
                        variant="outlined" 
                        type="password"
                        onChange={(e)=>setPassword2(e.target.value)}
                        />
                    </Box>
                    
                </Box>

                <Box sx={{ display: errorMsg?'block':'none' }}>
                    <Alert severity="error">{errorMsg}</Alert>
                </Box>

                <Box sx={{ display: 'inline-flex', justifyContent:'center' }}>
                        <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        sx={{ borderRadius: 100 }}
                        onClick={()=>handleSignUp()}
                        // loading={loading}
                        >Sign Up</Button>
                </Box>
            </Box>
        </Container>
    )
  }

export default SignUp;