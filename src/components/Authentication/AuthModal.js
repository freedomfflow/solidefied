import React, { useEffect, useRef, useState } from 'react';
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
    backgroundColor: 'primary.dark',
    color: 'white',
    borderRadius: 5
  },
  bar: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  google: {
    paddingBottom: 2,
    paddingTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    fontSize: 20,
    outline: 'none'
  }
};

const signupText = ['Sign Up Now'];

const AuthModal = ({text = 'Login', buttonVariant = 'contained'}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const {setAlert} = AppState();

  // Flag to use as condition to suppress useEffects from running on mount
  const isMounted = useRef(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (isMounted.current) {
      setOpen(false);
    }
  };

  // TODO fragile way of handlng this - put in config or use regex or include a new prop
  // Assign tab when we get here
  useEffect(() => {
    if (isMounted.current) {
      signupText.includes(text) ? setValue(1) : setValue(0);
    }
  }, [])

  // This MUSt always be the last useEffect instance
  useEffect(() => {
    isMounted.current = true;
  }, [])


  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
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
            variant={buttonVariant}
            size='medium'
            color='secondary'
            onClick={handleOpen}
        >
          {text}
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
                    indicatorColor='secondary'
                    sx={{borderRadius: 10}}
                >
                  <Tab label="Login"/>
                  <Tab label="Sign Up"/>
                </Tabs>
              </AppBar>
              {value === 0 && <Login handleClose={handleClose}/>}
              {value === 1 && <Signup handleClose={handleClose}/>}
              <Box sx={style.google}>
                <span> - OR - </span>
              </Box>
              <Box sx={{...style.google}}>
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
