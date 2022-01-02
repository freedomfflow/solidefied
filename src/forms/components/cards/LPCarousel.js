import React from 'react';
import { Carousel } from '../../../components';
import { Card, CardContent, Typography } from '@mui/material';
import 'react-alice-carousel/lib/alice-carousel.css';

const LPCarousel = () => {

  const style = {
    banner: {
      backgroundImage: 'url(./assets/img/banner2.jpg)',
    },
    bannerContent: {
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 2,
      justifyContent: 'space-around'
    }
  }


  return (
      <Card sx={{...style.banner, maxWidth: 600}}>
        <CardContent sx={style.bannerContent}>
          <Typography sx={{mb: 2}} variant="h5" component="div">
            Launched Project Tracker
          </Typography>
          <Carousel/>
        </CardContent>
      </Card>
  );
};

export default LPCarousel;
