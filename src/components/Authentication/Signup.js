import { Box, Button, TextField } from '@mui/material';
import { React, useState } from 'react';
import { AppState } from '../../contexts/AppContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../libs/dataStores/firebase';

const Signup = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setAlert } = AppState();

  const handleSubmit =  async () => {
    if (password !== confirmPassword) {
      setAlert({
        open: true,
        message: 'Passwords do not match',
        type: 'error'
      });
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      setAlert({
        open: true,
        message: `Sign Up Successful.  Welcome ${result.user.email}`,
        type: 'success'
      });
      handleClose();
    } catch(error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      });
    }
  };

  return (
      <Box
          p={3}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', label: {color: 'common.white'} }}
      >
        <TextField
            variant='outlined'
            type='email'
            label='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
            variant='outlined'
            type='password'
            label='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
            variant='outlined'
            type='password'
            label='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
        >
          Sign Up
        </Button>

      </Box>
  );
};

export default Signup;