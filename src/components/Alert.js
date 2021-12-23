import React from 'react';
import { AppState } from '../contexts/AppContext';
import { Alert, Snackbar } from '@mui/material';

const StandardAlert = () => {
  const {alert, setAlert} = AppState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {

    }

    setAlert({open: false});
  }

  return (
      <Snackbar
          open={alert.open}
          autoHideDuration={3000}
          onClose={handleClose}
      >
        <Alert
            onClose={handleClose}
            elevation={10}
            variant='filled'
            severity={alert.type}
        >
          { alert.message }
        </Alert>
      </Snackbar>
  );
};

export default StandardAlert;