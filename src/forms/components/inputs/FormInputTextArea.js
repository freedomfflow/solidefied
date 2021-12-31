import React from 'react';
import { TextareaAutosize } from '@mui/material';
import {Controller, useFormContext} from 'react-hook-form';

const FormInputTextArea = ({name, defaultValue, label, minRows=5}) => {
  const {control, formState: {errors}} = useFormContext();

  return (
      <Controller
        name={name}
        control={control}
        label={label}
        defaultValue={defaultValue}
        render={({field}) => (
            <TextareaAutosize
                {...field}
                aria-label="minimum height"
                minRows={minRows}
                style={{
                  width: '550px',
                  backgroundColor: '#e3e3e3',
                  fontSize: '17px',
                }}
            />
        )}
     />
  );
}


export default FormInputTextArea;