import React from 'react';
import {AppState} from '../../contexts/AppContext';
import {useFormContext, Controller} from 'react-hook-form';
import {Box, LinearProgress, TextField} from '@mui/material';

const LPApplicationInit = () => {
  const {loading, user, setAlert} = AppState();
  const {control, formState: {errors}} = useFormContext();

  return (
      <>
        {
          loading ? (
              <LinearProgress />
          ) : (
              <>
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
