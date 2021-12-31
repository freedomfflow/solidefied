import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, FormControl, FormLabel, LinearProgress, TextField, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { FormInputTextArea } from '../index';
import { getStep } from '../../config/lpappConfig';

const LPMoreInfo = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPMoreInfo');

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
                <Box sx={{...style.boxMargins}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Please add anything you think may be relevant</FormLabel>
                    <FormInputTextArea
                        name='additionalInfo'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='referrer'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Name and telegram ID of referrer (if applicable)'
                              type='referrer'
                              variant='outlined'
                              error={!!errors.referrer}
                              helperText={errors.referrer ? errors.referrer?.message : ''}
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

export default LPMoreInfo;
