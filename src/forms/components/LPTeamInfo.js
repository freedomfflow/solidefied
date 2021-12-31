import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, FormControl, FormLabel, LinearProgress, TextField, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { FormInputRadio, FormInputTextArea } from '../index';
import { getStep } from '../../config/lpappConfig';

const LPTeamInfo = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPTeamInfo');

  const radio_options = [
    {
      label: 'Yes',
      value: 1,
    },
    {
      label: 'No',
      value: 0
    },
  ];

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
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>
                      Names and titles of core team members with Linkedin Bio's (if applicable)
                    </FormLabel>
                    <FormInputTextArea
                        name='teamMembers'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Are you willing to provide KYC documents for the Founder(s)? (Passport or ID cards, address of founder(s), etc…)</FormLabel>
                    <FormInputRadio
                        name='teamKYC'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='founderEmails'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Email address(es) of Founder(s)'
                              type='founderEmails'
                              variant='outlined'
                              error={!!errors.founderEmails}
                              helperText={errors.founderEmails ? errors.founderEmails?.message : ''}
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
                      name='telegramID'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Telegram ID (and name) of person responsible for listing'
                              type='telegramID'
                              variant='outlined'
                              error={!!errors.telegramID}
                              helperText={errors.telegramID ? errors.telegramID?.message : ''}
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

export default LPTeamInfo;
