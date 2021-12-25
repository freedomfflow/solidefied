import React from 'react';
import { useFormContext} from 'react-hook-form';
import { Box, FormControl, FormLabel } from '@mui/material';
import { FormInputRadio } from '..';

// TODO find API to useFormContext so I know how to view whats in it
// TODO if radion selection is yes, need to unhide a new question, 'where is it incorporated'
const LPBusinessInfo = () => {
  const { formState: {errors}} = useFormContext();

  const options = [
    {
      label: 'Yes',
      value: 1,
    },
    {
      label: 'No',
      value: 0
    },
  ];

  return (
      <>
        <Box>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Is the Project/Business Incorporated?</FormLabel>
            <FormInputRadio
              name='incorporated'
              direction='row'
              defaultValue='0'
              options={options}
            />
          </FormControl>
        </Box>
      </>
  );
};

export default LPBusinessInfo;
