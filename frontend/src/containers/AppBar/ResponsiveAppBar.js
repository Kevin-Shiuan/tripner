import * as React from 'react';
import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import FeatherIcon from 'feather-icons-react';
import { alpha } from "@mui/material";
import { NavLink } from 'react-router-dom';
import { userContext } from '../../context/userContext';

// const pages = ['My Trip', 'CreateTrip', 'TripPlanner', 'TripInvite'];
const pages = [
  {
    name: "My Trip",
    route: "/my_trips"
  },
  {
    name: "Explore",
    route: "/"
  }
];
const settings = [
  {
    name: "Invitation",
    route: "/trip_invite"
  },
  {
    name: "Log Out",
    route: "/log_out"
  }
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useContext(userContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.76), 
        backdropFilter:"blur(6px)"
      }}
      >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* width screen */}
          <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            flexDirection: 'row', 
            alignItems: 'baseline', 
            width: '100%'
          }} 
          >
            {/* width screen LOGO*/}
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              Tripner
            </Typography>

            {/* width screen pages*/}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  component={NavLink}
                  to={page.route}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* small screen menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FeatherIcon icon="menu" /*stroke={}*//>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{
                sx:{
                  padding: 0,
                  paddingTop: '2px',
                  paddingBottom: '2px',
                  borderRadius: '8px',
                  width: 200
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu} 
                  component={NavLink}
                  to={page.route}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
            ))}
            </Menu>
          </Box>
          
          {/* small screen middle LOGO */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            Tripner
          </Typography>
          
          {/* Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textOverflow: 'ellipsis' }}>
              <Chip
                avatar={<Avatar>{user.charAt(0).toUpperCase()}</Avatar>}
                label={user}
                color='primary'
                onClick={handleOpenUserMenu}
              />
            </Box>
            <Menu
              sx={{ mt: '45px' }}
              PaperProps={{
                sx:{
                  padding: 0,
                  paddingTop: '2px',
                  paddingBottom: '2px',
                  borderRadius: '8px',
                  width: 200
                }
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseNavMenu} component={NavLink} to={setting.route}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
