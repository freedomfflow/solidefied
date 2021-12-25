import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const FormInputRadio = ({name, direction, defaultValue, options}) => {
  const {control, formState: {errors}} = useFormContext();

  const radioInput = () => {
    return options.map((singleOption) => (
        <FormControlLabel
            key={singleOption.value}
            value={singleOption.value}
            label={singleOption.label}
            control={<Radio/>}
        />
    ));
  };

  return (
      <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({field: {onChange, value}}) => (
              (direction === 'row') ? (
                  <RadioGroup
                      row
                      value={value}
                      onChange={onChange}
                  >
                    {radioInput()}
                  </RadioGroup>

              ) : (
                  <RadioGroup
                      value={value}
                      onChange={onChange}
                  >
                    {radioInput()}
                  </RadioGroup>
              )
          )}
      />
  );
};

export default FormInputRadio;