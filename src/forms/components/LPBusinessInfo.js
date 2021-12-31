import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Box, FormControl, FormLabel, LinearProgress, TextField, Typography } from '@mui/material';
import { FormInputRadio, FormInputTextArea } from '..';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useTranslation } from "react-i18next";
import { AppState } from '../../contexts/AppContext';
import { getStep } from '../../config/lpappConfig';
import { Trans } from 'react-i18next';

const LPBusinessInfo = ({title, subTitle = ''}) => {
  const {t} = useTranslation();
  const {activeLPStep, loading} = AppState();
  const {control, formState: {errors}} = useFormContext();
  const incorporated = useWatch({name: 'incorporated', control});
  const country = useWatch({name: 'country', control});
  const licensing = useWatch({name: 'licensing', control});
  const mvp = useWatch({name: 'mvp', control});
  const initialFundraisingStatus = useWatch({name: 'initialFundraisingStatus', control});
  const showCountrySelect = incorporated == 1;
  const showLicenseList = licensing == 1;
  const showFundraisingText = initialFundraisingStatus == 1;
  const showMvp = mvp == 2;
  const thisStep = getStep('LPBusinessInfo');

  // Style npm components in parent using child selector
  let style = {
    boxMargins: {
      marginTop: 2
    },
    countrySelect: {
      "> select": {
        width: '40%',
        height: '30px',
        border: '1px solid #999',
        backgroundColor: '#f0f0f0',
        fontSize: '16px',
        borderRadius: '5px',
        marginTop: '5px',
        marginRight: '10px',
        padding: '4px',
      }
    },
    otherRadio: {
      display: 'flex',
      justifyContent: 'flext-start',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
  }

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

  const other_radio_options = [
    {
      label: 'Yes',
      value: 1,
    },
    {
      label: 'No',
      value: 0
    },
    {
      label: 'Other',
      value: 2
    },
  ];


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
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Is the Project/Business Incorporated?</FormLabel>
                    <FormInputRadio
                        name='incorporated'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.countrySelect, display: (showCountrySelect) ? 'block' : 'none'}}
                >
                  <Controller
                      name='country'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <CountryDropdown
                              {...field}
                              defaultOptionLabel="Select Country"
                              country={country}
                          />
                      )}
                  />
                  <Controller
                      name='region'
                      control={control}
                      defaultValue=''
                      render={({field}) =>
                          <RegionDropdown
                              {...field}
                              blankOptionLabel="No Country Selected"
                              defaultOptionLabel="Select Region"
                              country={country}
                          />
                      }
                  />
                </Box>
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Are there any business licenses to report?</FormLabel>
                    <FormInputRadio
                        name='licensing'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{display: (showLicenseList) ? 'block' : 'none'}}
                >
                  <Controller
                      name='licenseList'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please list'
                              type='licenseList'
                              variant='outlined'
                              error={!!errors.licenseList}
                              helperText={errors.licenseList ? errors.licenseList?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box
                    sx={{...style.boxMargins, display: (showLicenseList) ? 'none' : 'block'}}
                >
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Do you plan on licensing?</FormLabel>
                    <FormInputRadio
                        name='licensingPlan'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Has there been any initial fundraising conducted?</FormLabel>
                    <FormInputRadio
                        name='initialFundraisingStatus'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box sx={{...style.boxMargins, display: (showFundraisingText) ? 'block' : 'none'}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Please explain fundraising efforts to date.</FormLabel>
                    <FormInputTextArea
                        name='initialFundraisingEfforts'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='fundingSource'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Source of funding to date'
                              type='fundingSource'
                              variant='outlined'
                              error={!!errors.fundingSource}
                              helperText={errors.fundingSource ? errors.fundingSource?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box sx={{...style.boxMargins}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Tokenomics detail (high-level detail or link to
                      explanation)</FormLabel>
                    <FormInputTextArea
                        name='tokenomics'
                        defaultValue=''
                    />
                  </FormControl>
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='blockchainIndustry'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Type of blockchain project (industry)'
                              type='blockchainIndustry'
                              variant='outlined'
                              error={!!errors.blockchainIndustry}
                              helperText={errors.blockchainIndustry ? errors.blockchainIndustry?.message : ''}
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
                      name='businessModel'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Business Model (how does your project earn revenue)'
                              type='businessModel'
                              variant='outlined'
                              error={!!errors.businessModel}
                              helperText={errors.businessModel ? errors.businessModel?.message : ''}
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
                      name='tokenUtility'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='What is the utility of the token?'
                              type='tokenUtility'
                              variant='outlined'
                              error={!!errors.tokenUtility}
                              helperText={errors.tokenUtility ? errors.tokenUtility?.message : ''}
                              fullWidth
                              margin='dense'
                          />
                      )}
                  />
                </Box>
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Is there a Legal Opinion letter on utility vs. security
                      token?</FormLabel>
                    <FormInputRadio
                        name='opinionLetter'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box sx={style.boxMargins}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Has the smart contract been audited?</FormLabel>
                    <FormInputRadio
                        name='smartContract'
                        direction='row'
                        defaultValue='0'
                        options={radio_options}
                    />
                  </FormControl>
                </Box>
                <Box sx={{...style.boxMargins, ...style.otherRadio}}>
                  <FormControl component='fieldset'>
                    <FormLabel component='legend'>Have you released an MVP?</FormLabel>
                    <FormInputRadio
                        name='mvp'
                        direction='row'
                        defaultValue='0'
                        options={other_radio_options}
                    />
                  </FormControl>
                  {
                    (showMvp) ? (
                        <Box sx={{mt: 2, ml: 2, width: '55%'}}>
                          <Controller
                              name='mvpOther'
                              control={control}
                              defaultValue=''
                              render={({field}) => (
                                  <TextField
                                      {...field}
                                      label='Other'
                                      type='mvpOther'
                                      variant='outlined'
                                      error={!!errors.mvpOther}
                                      helperText={errors.mvpOther ? errors.mvpOther?.message : ''}
                                      fullWidth
                                      margin='dense'
                                  />
                              )}
                          />
                        </Box>
                    ) : (<span>&nbsp;</span>)
                  }
                </Box>
                <Box
                    sx={{...style.boxMargins}}
                >
                  <Controller
                      name='whitepaper'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please share a link to your Whitepaper'
                              type='whitepaper'
                              variant='outlined'
                              error={!!errors.whitepaper}
                              helperText={errors.whitepaper ? errors.whitepaper?.message : ''}
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
                      name='websiteUrl'
                      control={control}
                      defaultValue=''
                      render={({field}) => (
                          <TextField
                              {...field}
                              label='Please add your website URL'
                              type='websiteUrl'
                              variant='outlined'
                              error={!!errors.websiteUrl}
                              helperText={errors.websiteUrl ? errors.websiteUrl?.message : ''}
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

export default LPBusinessInfo;
