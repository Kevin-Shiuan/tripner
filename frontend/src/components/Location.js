import { Typography, Box } from "@mui/material";

function Location({ locationInfo }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='h5'>
                {/* {locationInfo?locationInfo.name:'location name'} */}
                {locationInfo?locationInfo:'location name'}
            </Typography>
            {/* <Typography>
                Note:blablabla
            </Typography> */}
        </Box>
    )
  }
  

export default Location;
