import React from 'react';
import { AppState } from '../../contexts/AppContext';
import { Controller, useFormContext } from 'react-hook-form';
import { Box, LinearProgress, TextField, Typography } from '@mui/material';
import { getStep } from '../../config/lpappConfig';
import { useTranslation } from 'react-i18next';

const LPApplicationInit = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading, user, setAlert, activeAppId, lpappData} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPApplicationInit');

  return (
      <>
        {
          loading ? (
              <LinearProgress />
          ) : (
              <>
                {
                  (activeLPStep !== 7) ? (
                      <>
                        <Typography variant='h4' sx={{mb: 1}}> {t(`launchpad.steps.${thisStep}.title`)} </Typography>
                        <Typography variant='h6' sx={{mb: 1}}> {t(`launchpad.steps.${thisStep}.subtitle`)} </Typography>
                      </>
                  ) : (
                      <Typography variant='h6' sx={{mt: 2, mb: 1}}> {t(`launchpad.steps.${thisStep}.subtitle`)} </Typography>
                  )
                }
                <Box>
                  <Controller
                      name='email'
                      control={control}
                      defaultValue={user?.email}
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Email'
                              type='email'
                              variant='outlined'
                              error={!!errors.email}
                              helperText={errors.email ? errors.email?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box>
                  <Controller
                      name='projectName'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Project Name'
                              type='projectName'
                              variant='outlined'
                              error={!!errors.projectName}
                              helperText={errors.projectName ? errors.projectName?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box>
                  <Controller
                      name='projectTicker'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Project Ticker'
                              type='projectTicker'
                              variant='outlined'
                              error={!!errors.projectTicker}
                              helperText={errors.projectTicker ? errors.projectTicker?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
              </>
          )
        }
      </>
  );
};

export default LPApplicationInit;
