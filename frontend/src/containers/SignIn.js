import React from 'react';
import { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql';
import { NavLink, useNavigate } from 'react-router-dom';
import {userContext, passwordContext, signInContext} from '../context/userContext';

function SignIn() {

    const [user, setUser] = useContext(userContext);
    const [password, setPassword] = useContext(passwordContext);
    const [signIn, setSignIn] = useContext(signInContext);

    const [ signingIn ] = useMutation(SIGN_IN);
    const [ error1, setError1] = useState(false); //name
    const [ error2, setError2] = useState(false); //password
    const [ errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async()=>{
        setError1(false);
        setError2(false);
        let {data:{SignIn:{success, errorMessage}}} = await signingIn({
            variables:{
                name: user,
                password: password,
            }
        })
        if(success){
            setSignIn(true);
            navigate('/');
        }else{
            errorMessage==='The password is not correct'?setError2(true):setError1(true);
        }
        setErrorMsg(errorMessage);
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4, pb: 16 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography variant='h3'>Sign In to Tripner</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 1 }}>
                        <Typography>Haven't signed up yet?</Typography>
                        <Button
                        component={NavLink}
                        variant='outlined'
                        to={"/sign_up"}
                        >Sign Up</Button>
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
                        error={error1}
                        helperText={error1?errorMsg:''}
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
                        // defaultValue={password}
                        error={error2}
                        helperText={error2?errorMsg:''}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </Box>
                    
                </Box>

                <Box sx={{ display: 'inline-flex', justifyContent:'center' }}>
                        <Button 
                        variant="contained" 
                        size="large" 
                        fullWidth 
                        sx={{ borderRadius: 100 }}
                        onClick={()=>handleSignIn()}
                        // loading={loading}
                        >Sign In</Button>
                </Box>
            </Box>
        </Container>
    )
  }

export default SignIn;