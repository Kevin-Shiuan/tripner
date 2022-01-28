import { Grid, Box, Typography, Paper, Avatar, Chip, Input, TextField, Button, Tooltip, Autocomplete, Alert } from '@mui/material';
import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { TRIP_QUERY, UPDATE_TRIP_MUTATION, USER_QUERY } from '../graphql';
import { userContext } from '../context/userContext';
import { useEffect } from 'react';
import FeatherIcon from 'feather-icons-react';

import Location from '../components/Location';
import { mapContext } from '../context/mapContext';
import Map from '../gmap/Map';
import PlannerAppBar from './AppBar/PlannerAppBar';
import TripTimeline from '../components/TripTimeline';
import Search from '../gmap/Search';
import AvatarChip from '../components/AvatarChip';

const TripPlanner = () => {
    
    let { tripId } = useParams();

    const { loading, error, data, refetch } = useQuery(TRIP_QUERY, { 
        variables: {
            tripID: tripId,
        },
    });
    const [ updateTrip ] = useMutation(UPDATE_TRIP_MUTATION);

    const webpage_location = useNavigate();
    useEffect(() => {
        refetch();
    }, [webpage_location])

    const [ errorMsg, setErrorMsg] = useState('');
    const [ defaultTripmates, setDefaultTripmates ] = useState();
    const [ user, setUser ] = useContext(userContext);

    const [tripInfo, setTripInfo] = useState({
        __typename: "Trip",
        tripID:     tripId,
        trip_name:  "default name",
        city:       "default city",
        date_start: "",
        date_end:   "",
        open_to_public: false,
        tripmate:   [],  
        unscheduled_locations:  [],
        scheduled_locations:    [],
    })

    const [mapInfo, setMapInfo] = useState({
        //map config
        mapApi: null,
        mapInstance: null,

        center:{
            lat: 24.0169639,
            lng: 121.2261833
        },
        zoom: 7,
        mapLoaded: false,
        //autocomplete
        inputValue: '',
        searchResults: [],
        //location & details
        userLocations: []
        // userLocations: [{
        //     placeId: '',
        //     details: {}
        // }],
    });

    // useEffect(()=>{console.log(mapInfo.userLocations)},[mapInfo.userLocations]);

    const isLoaded=()=>{
        setTripInfo(data.Trip);
        setDefaultTripmates(data.Trip.tripmate);
    }
    
    useEffect(()=>{!loading?isLoaded():console.log("loading...")},[loading])

    useEffect(()=>{mapInfo.placeResult?handleLocationInfo():console.log("TripPlanner.js placeResult Effect fired but id is null");},[mapInfo.placeResult])

    const handleLocationInfo = ()=>{
        let locationArray = [...tripInfo.unscheduled_locations];
        locationArray.push(mapInfo.placeResult.name);
        // console.log(locationArray)
        setTripInfo({ ...tripInfo, unscheduled_locations: locationArray });
        // setMapInfo({ ...mapInfo, placeResult: {} });
    }

    const handelSave=async()=>{
        let {data:{updateTrip:{success, errorMessage}}} = await updateTrip({
            variables: {
                tripID: tripId,
                trip_name: tripInfo.trip_name,
                city: tripInfo.city,
                date_start: tripInfo.date_start,
                date_end: tripInfo.date_end,
                tripmate: tripInfo.tripmate,
                open_to_public: tripInfo.open_to_public,
                unscheduled_locations:  tripInfo.unscheduled_locations, //todo
                scheduled_locations:    tripInfo.scheduled_locations,
            }
        });
        if (success) {
            console.log("saved");
        }
        setErrorMsg(errorMessage);
    }
    

    return(
        <mapContext.Provider value={[mapInfo, setMapInfo]} >
        <Grid container >
            <Grid item xs={12} sm={12} md={7}>
                {/* wrapper */}
                <Box sx={{ width: '100%', height: '100vh', maxHeight: { sm: '90vh', md: '100vh' }}}> 
                    {/* this is for map */}
                    <Map />
                </Box>
            </Grid>

            <Tooltip title="Scroll">
            <Grid item xs={12} sm={12} sx={{ display:{ sm:'inline-flex', md: 'none' }, justifyContent: 'center' }} >
                <Box sx={{ width: '6%', height: 6, backgroundColor: 'primary.light', opacity: 0.64, borderRadius: 100, my: 2 }}/>
            </Grid>
            </Tooltip>

            <Grid item xs={12} sm={12} md={5}>
                <Box sx={{height: '100vh', overflow: 'auto'}}>
                        <PlannerAppBar handelSave={handelSave} />
                        <Box sx={{ display: errorMsg?'block':'none' }}>
                            <Alert severity="error">{errorMsg}</Alert>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 4, padding: 2 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Box mb={1}>
                                        <Typography variant='h3'>{tripInfo.trip_name}</Typography>
                                        <Typography variant='subtitle1'>{tripInfo.city}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'baseline' }}>
                                        <FeatherIcon icon="calendar"/>
                                        <Typography variant='subtitle1'>{tripInfo.date_start} - {tripInfo.date_end}</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography variant='h6'>Tripmate: </Typography>
                                    {defaultTripmates && <Autocomplete
                                        multiple
                                        id="tags-filled"
                                        filterSelectedOptions
                                        noOptionsText="No Active User Remaining..."
                                        options={defaultTripmates.filter((mate)=>mate!==user)}
                                        defaultValue={defaultTripmates.filter((mate)=>mate!==user)}
                                        // freeSolo
                                        renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip
                                                avatar={<Avatar >{option.charAt(0).toUpperCase()}</Avatar>}
                                                label={option} 
                                                {...getTagProps({ index })} 
                                            />
                                        ))}
                                        onChange={(e, newValue) => {setTripInfo({...tripInfo, tripmate: newValue})} }
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Tripmates"
                                        />
                                        )}
                                    />}
                                </Box>

                            </Box>
                        
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Typography variant='h5'>Looking for a Place to visit?</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    <Search />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
                                        <Typography variant='h6'>Schedule</Typography>
                                        <TripTimeline detailedLocations={mapInfo.userLocations} />
                                    </Box>
                                </Box>
                            </Box>
                        
                            
                        </Box>
                </Box>

            </Grid>
        </Grid>
        </mapContext.Provider>
    )

}

export default TripPlanner