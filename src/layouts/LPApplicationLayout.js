import React from 'react';
import { Container, Grid, } from '@mui/material';
import { LPStatus } from '../components';
import StickyBox from 'react-sticky-box';
import { PageLayout } from '.';

const LPApplicationLayout = ({ children }) => {

  return (
      <PageLayout>
        <Container sx={{ pt: 4, pb: 20 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={8} md={9}>
              { children }
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <StickyBox offsetTop={100}>
                <LPStatus />
              </StickyBox>
            </Grid>
          </Grid>
        </Container>
      </PageLayout>
  );
};

export default LPApplicationLayout;
