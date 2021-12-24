import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../libs/dataStores/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAlert } = AppState();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: 'All fields are required',
        type: 'error'
      });
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful.  Welcome ${result.user.email}`,
        type: 'success'
      });

    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error'
      });
    }
  }

  return (
      <Box
          p={3}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
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
        <Button
            variant='contained'
            size='large'
            onClick={handleSubmit}
        >
          Login
        </Button>

      </Box>
  );
};

export default Login;