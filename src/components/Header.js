import React from 'react';
import {
  AppBar,
  Container,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../contexts/AppContext';
import { Theme } from '../contexts/ThemeContext';
import { AuthModal, UserSidebar } from '../components';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

let style = {
  title: {
    flex: 1,
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};

// TODO need to fix the styling for the Swtich -- unstyledswitch??

const Header = () => {
  const navigate = useNavigate();

  const { user } = AppState();
  const  { darkMode, setDarkMode } = Theme();

  return (
        <AppBar color='transparent' position='static'>
          <Container>
            <Toolbar>
              <Typography color='primary.main'
                  onClick={() => navigate('/')}
                  sx={style.title}
                  variant='h6'
              >
                SOLIDEFIED
              </Typography>
              {/*<FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} label="Dark Mode" />*/}
              { user ? <UserSidebar /> : <AuthModal /> }
              <Switch
                checked={darkMode}
                icon={<LightModeOutlinedIcon />}
                checkedIcon={<DarkModeOutlinedIcon />}
                onChange={() => setDarkMode(!darkMode)}
              />
            </Toolbar>
          </Container>
        </AppBar>
  );
};

export default Header;