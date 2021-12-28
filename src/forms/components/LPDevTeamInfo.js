import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, LinearProgress, TextField, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { useTranslation } from "react-i18next";
import { getStep } from '../../config/lpappConfig';
import { Trans } from 'react-i18next';

const LPDevTeamInfo = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPDevTeamInfo');

  let style = {
    boxMargins: {
      marginTop: 2
    },
  }


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
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='coreDevs'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Names of Core Developers'
                              type='coreDevs'
                              variant='outlined'
                              error={!!errors.coreDevs}
                              helperText={errors.coreDevs ? errors.coreDevs?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='coreDevLocations'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Country/Countries where developers are located'
                              type='coreDevLocations'
                              variant='outlined'
                              error={!!errors.coreDevLocations}
                              helperText={errors.coreDevLocations ? errors.coreDevLocations?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='devCommitments'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='How many devs do you have (split between full-time & part-time) ?'
                              type='devCommitments'
                              variant='outlined'
                              error={!!errors.devCommitments}
                              helperText={errors.devCommitments ? errors.devCommitments?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='devsInHouse'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='How many developers are in house vs outsourced?'
                              type='devsInHouse'
                              variant='outlined'
                              error={!!errors.devsInHouse}
                              helperText={errors.devsInHouse ? errors.devsInHouse?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='coreDevExperienceLevels'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='What is the experience level of core developers?'
                              type='coreDevExperienceLevels'
                              variant='outlined'
                              error={!!errors.coreDevExperienceLevels}
                              helperText={errors.coreDevExperienceLevels ? errors.coreDevExperienceLevels?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='coreDevEducationLevels'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='What is the education level of core developers?'
                              type='coreDevEducationLevels'
                              variant='outlined'
                              error={!!errors.coreDevEducationLevels}
                              helperText={errors.coreDevEducationLevels ? errors.coreDevEducationLevels?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='securityConcerns'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Do you have any security concerns that need to be addressed?'
                              type='securityConcerns'
                              variant='outlined'
                              error={!!errors.securityConcerns}
                              helperText={errors.securityConcerns ? errors.securityConcerns?.message : ''}
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

export default LPDevTeamInfo;
