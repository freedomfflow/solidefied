import React from 'react';
import { Box, Card, CardActions, CardContent, Typography } from '@mui/material';
import { AppState } from '../../../contexts/AppContext';
import { role } from '../../../config/lpappConfig';

const LPProjectSummary = ({app}) => {

  const { currentRole } = AppState();

  return (
      <>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {app.application.projectName}
            </Typography>
            <Typography component="p">
              Date:&nbsp;
              {app.application.appId}
            </Typography>
            <Typography>
              {app.application.appStatus}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
            sx={(currentRole === role.APP_ADMIN) ? {display: 'block'} : {display: 'none'}}>
             Manage White Lists
            </Box>
            <Box> Do Something</Box>
          </CardActions>
        </Card>
      </>
  );
};

export default LPProjectSummary;
