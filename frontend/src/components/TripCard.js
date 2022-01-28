import { useState } from 'react';
import { Container, Typography, Card, CardContent, CardActionArea, CardMedia, Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';

function TripCard({ imgURL, tripName, tripCity, tripID }) {
    const [loaded, setLoaded]=useState(false);
    return (
      <Card>
          <CardActionArea component={NavLink} to={`/trip_planner/${tripID}`}>
          {!loaded && <Skeleton variant="rectangular" height={200}/>}
              <CardMedia
              component="img"
              height={loaded?"200":"0"}
              image={imgURL}
              onLoad={()=>setLoaded(true)}
              />
              <CardContent>
                  <Typography variant="h5" component="div">
                      {tripName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                      {tripCity}
                  </Typography>
              </CardContent>
          </CardActionArea>
      </Card>
    )
  }
  

export default TripCard;
