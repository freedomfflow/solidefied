import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {Box, TextField} from '@mui/material';

const LPBusinessInfo = () => {
  const {control, formState: {errors}} = useFormContext();
  return (
      <>
        <Box>
          <Controller
              name='incorporated'
              control={control}
              defaultValue=''
              render={({field}) => (
                  <TextField
                      {...field}
                      label='Is the Business/Project Incorporated'
                      type='incorporated'
                      variant='outlined'
                      error={!!errors.incorporated}
                      helperText={errors.incorporated ? errors.incorporated?.message : ''}
                      fullWidth
                      margin='dense'
                  />
              )}
          />
        </Box>
      </>
  );
};

export default LPBusinessInfo;
