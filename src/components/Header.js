import React from 'react';
import {
  AppBar,
  Box,
  Container,
  Fab,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../contexts/AppContext';
import { Theme } from '../contexts/ThemeContext';
import { AuthModal, UserSidebar } from '../components';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

// TODO Utilize menu feature -- Menu is a tooltip - i like it - prob wont use pages long term
// const pages = ['Products', 'Pricing', 'Blog'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const pages = [{route: '/launchpad', name: 'Launch Pad'}];
const settings = [];

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

  const {setOpenDrawer, user} = AppState();
  const {darkMode, setDarkMode} = Theme();

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
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky'>
        <Container>
          <Toolbar>
            <FormGroup
                sx={{ display: (user) ? 'block' : 'none' }}
            >
              <FormControlLabel
                  control={
                    <Fab size='small' color='primary' aria-label="add"
                         onClick={() => setOpenDrawer({left: true})}
                    >
                      <AddIcon />
                    </Fab>
                  }
                  label=''
              />
            </FormGroup>
            <Typography
                onClick={() => navigate('/')}
                sx={style.title}
                variant='h6'
            >
              SOLIDEFIED
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
              >
                <MenuIcon />
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
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                  <Button
                      key={page.name}
                      onClick={() => navigate(page.route)}
                      sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/*<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />*/}
                </IconButton>
              </Tooltip>
              <Menu
                  sx={{ mt: '45px' }}
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
                    <MenuItem key={setting} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                ))}
              </Menu>
            </Box>

            {/*<FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} label="Dark Mode" />*/}
            {user ? <UserSidebar anchorItem='avatar'/> : <AuthModal/>}
            <Switch
                checked={darkMode}
                icon={<LightModeOutlinedIcon/>}
                checkedIcon={<DarkModeOutlinedIcon/>}
                onChange={() => setDarkMode(!darkMode)}
            />
          </Toolbar>
        </Container>
      </AppBar>
      </Box>
  );
};

export default Header;