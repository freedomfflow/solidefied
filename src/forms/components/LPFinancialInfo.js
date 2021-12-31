import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, LinearProgress, TextField, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { useTranslation } from "react-i18next";
import { getStep } from '../../config/lpappConfig';
import { Trans } from 'react-i18next';

const LPFinancialInfo = ({title, subTitle=''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const thisStep = getStep('LPFinancialInfo');

  let style = {
    boxMargins: {
      marginTop: 2
    },
  }

  return (
      <>
        {
          loading ? (
              <LinearProgress/>
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
                      name='maxRaise'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Total amount (in $USD/USDT) looking to raise?'
                              type='maxRaise'
                              variant='outlined'
                              error={!!errors.maxRaise}
                              helperText={errors.maxRaise ? errors.maxRaise?.message : ''}
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
                      name='presalePrice'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Expected initial pre-sale token price?'
                              type='presalePrice'
                              variant='outlined'
                              error={!!errors.presalePrice}
                              helperText={errors.presalePrice ? errors.presalePrice?.message : ''}
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
                      name='publicPrice'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Expected public sale / listing token price?'
                              type='publicPrice'
                              variant='outlined'
                              error={!!errors.publicPrice}
                              helperText={errors.publicPrice ? errors.publicPrice?.message : ''}
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
                      name='tgeMarketcap'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Market cap at TGE (token generation event)'
                              type='tgeMarketcap'
                              variant='outlined'
                              error={!!errors.tgeMarketcap}
                              helperText={errors.tgeMarketcap ? errors.tgeMarketcap?.message : ''}
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

export default LPFinancialInfo;
