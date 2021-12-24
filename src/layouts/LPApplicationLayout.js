import React from 'react';
import { Container, Grid, } from '@mui/material';
import { LPStatus } from '../components';
import StickyBox from "react-sticky-box";
import { useTranslation } from "react-i18next";
import { PageLayout } from '.';
// TODO Steps might be needed, but will likely be in the Step component
// import { resourcePages } from 'utils';

const LPApplicationLayout = ({ children }) => {
  const { t } = useTranslation();

  return (
      <PageLayout>
        <Container sx={{ pt: 4, pb: 20 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={8} md={9}>
              { children }
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <StickyBox offsetTop={100}>
                <LPStatus title={t('launchpad.status.title')}  />
              </StickyBox>
            </Grid>
          </Grid>
        </Container>
      </PageLayout>
  );
};

export default LPApplicationLayout;
