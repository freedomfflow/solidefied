import React, { useState } from 'react';
import { AppBar, Box, Modal, Button, Fade, Tab, Tabs } from '@mui/material';
import { Login, Signup } from '../../components';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider } from '@firebase/auth';
import { AppState } from '../../contexts/AppContext';
import { signInWithPopup } from "firebase/auth";
import { auth } from '../../libs/dataStores/firebase';

let style = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: 'primary.light',
    color: 'white',
    borderRadius: 5
  },
  bar: {
    backgroundColor: 'transparent',
    color: 'white'
  },
  google: {
    padding: 10,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: '100%',
    gap: 2,
    fontSize: 20,
    outline: 'none'
  }
};

const AuthModal = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = AppState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    console.log('Google');
    console.log(auth);
    signInWithPopup(auth, googleProvider)
        .then(res => {
          setAlert({
            open: true,
            message: 'Sign up Successful',
            type: 'success'
          });

          handleClose();
        })
        .catch((error) => {
          setAlert({
            open: true,
            message: error.message,
            type: 'error'
          })
        });
  }

  return (
      <div>
        <Button
            variant='contained'
            sx={{
              width: 85,
              height: 40,
            }}
            onClick={handleOpen}
        >
          Login
        </Button>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={style.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style.paper}>
              <AppBar
                  position="static"
                  sx={style.bar}
              >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='fullWidth'
                    sx={{ borderRadius: 10 }}
                >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </AppBar>
              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <Signup handleClose={handleClose} />}
              <Box sx={style.google}>
                <span> - OR - </span>
                <GoogleButton
                  type='dark'
                  onClick={signInWithGoogle}
                />
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
  );
}

export default AuthModal;
