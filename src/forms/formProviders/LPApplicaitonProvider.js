import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {AppState} from '../../contexts/AppContext';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Container, Button, LinearProgress } from '@mui/material';
import { LPApplicationInit, LPBusinessInfo } from '..';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  projectName: yup.string().required(),
  projectTicker: yup.string().required(),
});

// TODO add AppContext to store data if retrieved and/or when use inputs/updates data b4 submitting

const LPApplicationProvider = () => {
  const {loading, user, setAlert} = AppState();
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  const formSubmitHandler = (data) => {
    console.log('Form Data ' , data);
  }

  return (
      <>
        {
          loading ? (
              <LinearProgress />
          ) : (
              <Box sx={{mx: 'auto', width: 600}}>
                <Container>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                      <Box>
                        <LPApplicationInit/>
                      </Box>
                      <Box>
                        <LPBusinessInfo/>
                      </Box>
                      <Box>
                        <Button
                            variant='containeed'
                            type='submit'
                        >
                          Save Progress
                        </Button>
                      </Box>
                    </form>
                  </FormProvider>
                </Container>
              </Box>
          )
        }
      </>
  );
};

export default LPApplicationProvider;
