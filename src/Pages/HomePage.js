import React from 'react';
import { Paper } from '@mui/material';

const HomePage = () => {
  return (
      <>
        <Paper>
          <h1>HOME PAGE</h1>
          <p>{process.env.NODE_ENV}</p>
          <p>{process.env.REACT_APP_MY_API_KEY}</p>
        </Paper>
      </>
  );
};

export default HomePage;
