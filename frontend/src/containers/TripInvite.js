import { Container, Box, Typography, Avatar, AvatarGroup, Button } from '@mui/material';
import LoadableAvatar from '../components/LoadableAvatar';

function TripInvite(){
    return(
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, pt: 4, pb: 16 }}>
                <Typography variant="h3">Trip Name</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6">Created by</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <LoadableAvatar
                            alt="Name"
                            src="https://source.unsplash.com/random/?potrait"
                            sx={{ width: 56, height: 56 }}
                            />
                            <Typography variant="h4">Creator Name</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'baseline' }}>
                        <AvatarGroup total={24} max={8} >
                            <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random/5000x5000/?potrait" />
                            <Avatar alt="Travis Howard" src="https://source.unsplash.com/random/?potrait" />
                            <Avatar alt="Agnes Walker" src="https://source.unsplash.com/random/?potrait" />
                            <Avatar alt="Trevor Henderson" src="https://source.unsplash.com/random/?potrait" />
                            <Avatar alt="Trevor Henderson" src="https://source.unsplash.com/random/?potrait" />
                        </AvatarGroup>
                        <Typography>had joined</Typography>
                    </Box>

                    <Button variant="contained" size="large" sx={{ borderRadius: 100}}>Join Trip</Button>

                </Box>
            </Box>
        </Container>
    )

}

export default TripInvite