import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, FormControl, FormLabel, LinearProgress, TextField, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { FormInputTextArea } from '../index';
import { getStep } from '../../config/lpappConfig';

const LPMarketingPlans = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPMarketingPlans');

  let style = {
    boxMargins: {
      marginTop: 3
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
                      name='telegramChannelUrl'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please add a link to your telegram main channel'
                              type='telegramChannelUrl'
                              variant='outlined'
                              error={!!errors.telegramChannelUrl}
                              helperText={errors.telegramChannelUrl ? errors.telegramChannelUrl?.message : ''}
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
                      name='twitterUrl'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please share your twitter page'
                              type='twitterUrl'
                              variant='outlined'
                              error={!!errors.twitterUrl}
                              helperText={errors.twitterUrl ? errors.twitterUrl?.message : ''}
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
                      name='socialFollowerCount'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='How many total followers across all social channels?'
                              type='socialFollowerCount'
                              variant='outlined'
                              error={!!errors.socialFollowerCount}
                              helperText={errors.socialFollowerCount ? errors.socialFollowerCount?.message : ''}
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
                      name='youtubeUrl'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='If you have a Youtube presence, please provide the channel link'
                              type='youtubeUrl'
                              variant='outlined'
                              error={!!errors.youtubeUrl}
                              helperText={errors.youtubeUrl ? errors.youtubeUrl?.message : ''}
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
                      name='marketingInitiatives'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please list all current marketing initiatives'
                              type='marketingInitiatives'
                              variant='outlined'
                              error={!!errors.marketingInitiatives}
                              helperText={errors.marketingInitiatives ? errors.marketingInitiatives?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box sx={{...style.boxMargins}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>What is your high-level marketing plan post token listing?</FormLabel>
                    <FormInputTextArea
                        name='marketingPlan'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='activePartnerships'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please list all partnerships in place'
                              type='activePartnerships'
                              variant='outlined'
                              error={!!errors.activePartnerships}
                              helperText={errors.activePartnerships ? errors.activePartnerships?.message : ''}
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
                      name='pendingPartnerships'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please list any pending/planned partnerships'
                              type='pendingPartnerships'
                              variant='outlined'
                              error={!!errors.pendingPartnerships}
                              helperText={errors.pendingPartnerships ? errors.pendingPartnerships?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box sx={{...style.boxMargins}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Please share 4-5 key components of your project roadmap over the next 90 days</FormLabel>
                    <FormInputTextArea
                        name='roadmap'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='governanceModel'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Type of Governance Model Planned?'
                              type='governanceModel'
                              variant='outlined'
                              error={!!errors.governanceModel}
                              helperText={errors.governanceModel ? errors.governanceModel?.message : ''}
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

export default LPMarketingPlans;
