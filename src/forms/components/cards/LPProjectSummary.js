import React from 'react';
import { Card, CardActions, CardContent, Typography } from '@mui/material';
import { AppState } from '../../../contexts/AppContext';

const LPProjectSummary = ({app}) => {

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
            <div> Do Something </div>
          </CardActions>
        </Card>
      </>
  );
};

export default LPProjectSummary;
