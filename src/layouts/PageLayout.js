import React from 'react';
import { Paper } from '@mui/material';

const style = {
  page: {
    width: '100%',
    minHeight: '100vh',
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: 2,
    // '& .effectLink': {
    //   textDecoration: 'none',
    //   position: 'relative',
    //   '&:before': {
    //     content: '""',
    //     position: 'absolute',
    //     width: '100%',
    //     height: 1,
    //     top: '100%',
    //     left: 0,
    //     pointerEvents: 'none',
    //     transformOrigin: '100% 50%',
    //     transform: 'scale3d(0, 1, 1)',
    //     transition: 'transform 0.3s',
    //   },
    //   '&:hover': {
    //     '&:before': {
    //       transformOrigin: '0% 50%',
    //       transform: 'scale3d(1, 1, 1)'
    //     }
    //   },
    // }
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