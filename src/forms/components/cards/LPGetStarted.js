import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthModal } from '../../../components'

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);


// TODO - explainer text in box & auth modal on click
/*<UserSidebar anchorItem='button' btnText='My Projects'/>*/
const LPGetStarted = () => {
  return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Get Started
          </Typography>
          <Typography variant="h5" component="div">
            New Launchpad Application
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            create a free account
          </Typography>
          <Typography variant="body2">
            Sign-up, start a new app...
            <br />
            your fastest way to from here to there
          </Typography>
        </CardContent>
        <CardActions>
          <AuthModal text='Sign Up Now'  buttonVariant='contained' />
        </CardActions>
      </Card>
  );
}

export default LPGetStarted;