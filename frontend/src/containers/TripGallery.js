import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { useState, useContext, useEffect} from 'react';
import { useQuery, useLazyQuery  } from "@apollo/client";
import { USERTRIPS_QUERY, TRIP_CREATED_SUBSCRIPTION } from '../graphql';
import { userContext, passwordContext, signInContext } from '../context/userContext';

import TripCard from '../components/TripCard';
import { NavLink, useNavigate } from 'react-router-dom';

function TripGallery() {
    const [user, setUser] = useContext(userContext);
    const webpage_nav = useNavigate();
    const {loading, data, error, subscribeToMore, refetch} = useQuery(USERTRIPS_QUERY, { 
        variables: {
            name: user,
        },
    });

    useEffect(() => {
        refetch();
    }, [webpage_nav])

    useEffect(() => {
        console.log("re-render")
        subscribeToMore({
            document: TRIP_CREATED_SUBSCRIPTION,
            variables: { user_name: user },
            updateQuery: (prev, { subscriptionData }) => {
                console.log("dfjaifjdsiafj");
                console.log(prev);
                console.log(subscriptionData.data);
                if (!subscriptionData.data) return prev;
                return {
                    UserTrips: [...prev.UserTrips, subscriptionData.data.tripCreated],
                };
            },
        });
    }, [subscribeToMore])

    if (loading) {
        return <div>loading</div>
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4, pb: 16 }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h3'>{user}'s Trips</Typography>
                    <Button 
                      variant="contained" 
                      size="large" 
                      sx={{borderRadius: 100}}
                      component={NavLink}
                      to={'/create_trip'}
                    >
                    Create New Trip
                    </Button>
                </Box>
                <Grid container spacing={{ xs: 2, sm: 1 }}>
                    { data.UserTrips.map( ({tripID, trip_name, city, image}) => 
                        <Grid item xs={12} sm={6} md={4} key={tripID}>
                            <TripCard imgURL={image} tripName={trip_name} tripCity={city} tripID={tripID}/>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Container>
    
    )
  }
  

export default TripGallery;
