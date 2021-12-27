import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {AppState} from '../../contexts/AppContext';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Container, Button, LinearProgress } from '@mui/material';
import { LPApplicationInit, LPBusinessInfo } from '..';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../libs/dataStores/firebase';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  projectName: yup.string().required(),
  projectTicker: yup.string().required(),
  incorporated: yup.string().required(),
});

const LPApplicationProvider = () => {
  const {loading, user, setAlert, activeLPStep, lpappData, lpappUpdateTrigger, setLpappUpdateTrigger } = AppState();
  const methods = useForm({
    resolver: yupResolver(schema)
  });
  let triggerCounter = lpappUpdateTrigger;

  // TODO put 'lpapps' in firebase config file I will used to map collections to identifiers

  const saveAppData = async (formData) => {
    // Context var that will trigger firebase watcher in AppContext to update lpappData so context is current
    triggerCounter++;
    const dataSet = {...lpappData, formData};
    const appRef = doc(db, 'lpapps', lpappData.appId);
    try {
      await setDoc(appRef, {
        application: dataSet,
      }, {merge: 'true'});
      setLpappUpdateTrigger(triggerCounter);
      setAlert({
        open: true,
        message: 'Progress updated',
        type: 'success',
      })
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      })
    }
  }

  const formSubmitHandler = async (data) => {
    console.log('FORM SUMBIT DATA', data);
    await saveAppData(data);
  }

  return (
      <>
        {
          loading ? (
              <LinearProgress />
          ) : (
              <>
              <Box sx={{mx: 'auto', width: 600}}>
                <Container>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                      <Box sx={ (activeLPStep === 0) ? {display: 'block'} : {display: 'none' } }>
                        <LPApplicationInit title='Step 1'/>
                      </Box>
                      <Box sx={ (activeLPStep === 1) ? {display: 'block'} : {display: 'none' } }>
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
            </>
          )
        }
      </>
  );
};

export default LPApplicationProvider;
