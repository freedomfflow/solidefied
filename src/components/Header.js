import React, { useCallback } from 'react';
import {
  AppBar, Avatar,
  Box,
  Container,
  Fab,
  FormControlLabel,
  FormGroup,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../contexts/AppContext';
import { Theme } from '../contexts/ThemeContext';
import { AuthModal, UserSidebar } from '../components';
import { signOut } from '@firebase/auth';
import { auth, db } from '../libs/dataStores/firebase';

import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// TODO Utilize menu feature -- Menu is a tooltip - i like it - prob wont use pages long term
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = [];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [{route: '/launchpad', name: 'Launch Pad'}];

let style = {
  title: {
    flex: 1,
    fontWeight: 'bold',
    cursor: 'pointer',
    alignItems: 'center',
  }
};

// TODO need to fix the styling for the Swtich -- unstyledswitch??

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const {setAlert, setOpenDrawer, user} = AppState();
  const {darkMode, setDarkMode} = Theme();

  const logOut = () => {
    signOut(auth);
    setOpenDrawer(false);
    setAlert({
      open: true,
      message: 'Logout Successful.',
      type: 'success'
    });
  };

  const handleOpenNavMenu = useCallback((event) => {
    setAnchorElNav(event.currentTarget);
  }, []);
  const handleOpenUserMenu = useCallback((event) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseNavMenu = useCallback((setting) => {
    setAnchorElNav(null);
    setAnchorElUser(null);
    if (setting === 'Logout') {
      logOut();
    }
  }, []);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      <AppBar position='sticky' sx={{backgroundColor: 'primary.main'}}>
        <Container>
          <Toolbar>
            <FormGroup
                sx={{display: (user) ? 'block' : 'none'}}
            >
              {user && <UserSidebar anchorItem='addIcon'/>}
            </FormGroup>
            <Typography
                onClick={() => navigate('/')}
                sx={style.title}
                variant='h6'
            >
              SOLIDEFIED
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon/>
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
                    display: {xs: 'block', md: 'none'},
                  }}
              >
                {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
            >
              LOGO
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
              {pages.map((page) => (
                  <Button
                      key={page.name}
                      onClick={() => navigate(page.route)}
                      sx={{my: 2, display: 'block'}}
                  >
                    <Typography sx={{color: 'info.main'}}>{page.name}</Typography>
                  </Button>
              ))}
            </Box>

            <Box sx={{flexGrow: 0}}>
              {/*<Tooltip title="Open settings">*/}
              {/*  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>*/}
              {/*    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
              {/*  </IconButton>*/}
              {/*</Tooltip>*/}
              <Menu
                  sx={{mt: '45px'}}
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
                    <MenuItem key={setting} onClick={() => handleCloseNavMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>

            {user ? <Avatar sx={style.picture}
                            src={user.photoURL}
                            atl={user.displayName}
                            onClick={handleOpenUserMenu}
                />
                : <AuthModal/>
            }
            {/*{user ? <UserSidebar anchorItem='avatar'/> : <AuthModal/>}*/}
            <IconButton sx={{ml: 1}} onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7Icon/> : <Brightness4Icon/>}
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
  );
};

export default Header;