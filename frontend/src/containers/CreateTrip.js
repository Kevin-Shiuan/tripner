import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Container, Box, Typography, TextField, FormGroup, FormControlLabel, Switch, Avatar, Chip, Button, Alert, Autocomplete } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TRIP_MUTATION, ALLUSER_QUERY } from '../graphql';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import FeatherIcon from 'feather-icons-react';
import { set } from 'date-fns';
import AvatarChip from '../components/AvatarChip';


function CreateTrip(){

    const { data, loading } = useQuery(ALLUSER_QUERY);
    const [ createTrip ] = useMutation(CREATE_TRIP_MUTATION);
    const navigate = useNavigate();

    const [ tripName, setTripName ] = useState('');
    const [ city, setCity] = useState('');
    const [ date, setDate ] = useState([null, null]);
    const [ tripmate, setTripmate ] = useState([]);
    const [ openToPublic, setOpenToPublic ] = useState(false);
    const [ errorMsg, setErrorMsg] = useState('');
    const [ userList, setUserList ] = useState();
    const [ user, setUser ] = useContext(userContext);

    const handleCreateTrip = async () => {
        // console.log(date);
        if (!tripName) {
            setErrorMsg("Must have trip name");
            return;
        }
        if (!city) {
            setErrorMsg("Must have city");
            return;
        }
        if (!date[0]) {
            setErrorMsg("Must have start day");
            return;
        }
        if (!date[1]) {
            setErrorMsg("Must have end day");
            return;
        }
        // if (!tripmate) {
        //     setErrorMsg("Must have at least one tripmate");
        //     return;
        // }
        
        let {data:{createTrip:{success, errorMessage}}} = await createTrip({
            variables: {
                trip_name: tripName, 
                city: city, 
                date_start: date[0].toDateString(), 
                date_end: date[1].toDateString(), 
                image: `https://source.unsplash.com/random/?${city}`,
                tripmate: [...tripmate, user],
                open_to_public: openToPublic,
            }
        });

        if (success) {
            navigate('/');
        }
        setErrorMsg(errorMessage);
    };

    useEffect(()=>{!loading?setUserList(data.AllUsers.map((data)=>data.name)):console.log("loading...")},[loading])

    return(
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4, pb: 16 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Button
                    component={NavLink}
                    to={'/my_trips'}
                    >Back to Home</Button>
                </Box>

                <Typography variant='h3'>Create trip</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Trip Name</Typography>
                        <TextField 
                        id="outlined-basic" 
                        placeholder="Trip Name" 
                        margin="dense"
                        variant="outlined" 
                        onChange={(e)=>setTripName(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>City to travel</Typography>
                        <TextField 
                        id="outlined-basic" 
                        placeholder="City Name" 
                        margin="dense"
                        variant="outlined" 
                        onChange={(e)=>setCity(e.target.value)}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Date</Typography>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateRangePicker
                                startText="Start"
                                endText="End"
                                value={date}
                                onChange={(newValue) => {
                                setDate(newValue);
                                }}
                                renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField 
                                    {...startProps}
                                    margin="dense"
                                    sx={{ width: '100%' }}
                                    />
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField
                                    {...endProps}
                                    margin="dense"
                                    sx={{ width: '100%' }}
                                    />
                                </React.Fragment>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Tripmate</Typography>
                        {userList && <Autocomplete
                            multiple
                            id="tags-filled"
                            filterSelectedOptions
                            options={userList.filter((mate)=>mate!==user)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    avatar={<Avatar >{option.charAt(0).toUpperCase()}</Avatar>}
                                    label={option} 
                                    {...getTagProps({ index })} 
                                />
                            ))}
                            onChange={(e, newValue) => {setTripmate(newValue)}}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                placeholder="Tripmates"
                            />
                            )}
                        />}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant='h5'>Privacy</Typography>
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultChecked={false} onChange={(e)=>{setOpenToPublic(e.target.value)}}/>} label="Share to Public" />
                        </FormGroup>
                    </Box>
                    
                    <Box sx={{ display: errorMsg?'block':'none' }}>
                        <Alert severity="error">{errorMsg}</Alert>
                    </Box>
                    <Button variant="contained" size="large" sx={{ borderRadius: 100}} onClick={() => handleCreateTrip()}>Start Planning!</Button>

                </Box>
            </Box>
        </Container>
    )
}

export default CreateTrip