import { useState } from 'react';
import { Box, Avatar, Skeleton } from '@mui/material';

function LoadableAvatar({ sx, ...props}) {
    console.log(sx+props)
    const [loaded, setLoaded]=useState(false);
    return (
        <Box>
            {!loaded && <Skeleton variant='circular' sx={loaded?{ width: 0, height: 0 }:sx}/>}
            <Avatar sx={loaded?sx:{ width: 0, height: 0 }} {...props} onLoad={()=>setLoaded(true)}></Avatar>
        </Box>
    )
  }
  

export default LoadableAvatar;