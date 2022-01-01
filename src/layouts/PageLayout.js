import React from 'react';
import { Paper } from '@mui/material';

const style = {
  page: {
    width: '100%',
    minHeight: '100vh',
    paddingTop: 6,
  },
};

const PageLayout = ({children}) => {

  return (
      <Paper sx={style.page}>
        {children}
      </Paper>
  );
};

export default PageLayout;