import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FeatherIcon from 'feather-icons-react';
import { alpha } from "@mui/material";
import { NavLink } from 'react-router-dom';

export default function PlannerAppBar( { handelSave } ) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar      
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: () => alpha('#F8F8F8', 0.76), 
        backdropFilter:"blur(6px)"
      }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button
            component={NavLink}
            to={'/my_trips'}
            >Back to Home</Button>
          </Box>
          <Button variant="contained" startIcon={<FeatherIcon icon="save"/>} sx={{ borderRadius: 100}} onClick={handelSave}>Save</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
