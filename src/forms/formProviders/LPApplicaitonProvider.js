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

// TODO add AppContext to store data if retrieved and/or when use inputs/updates data b4 submitting

const LPApplicationProvider = () => {
  const {loading, user, setAlert, activeLPStep, lpappData, setLpappData} = AppState();
  const methods = useForm({
    resolver: yupResolver(schema)
  });

  // TODO put 'lpapps' in firebase config file I will used to map collections to identifiers

  // TODO not quite working --
  //  -- guess formData will be an object withing application - but would like to change I think
  //  -- lpappData is lost when I 'save app data' on submit, but db is updated
  //  need to fix above b4 I can move forward with form processing
  const saveAppData = async (formData) => {
    console.log('SAV data');
    console.log(lpappData);
    console.log(formData);
    const dataSet = {...lpappData, formData};
    console.log('DATA SET = ', dataSet);
    const appRef = doc(db, 'lpapps', lpappData.appId);
    try {
      await setDoc(appRef, {
        application: dataSet,
      }, {merge: 'true'});
      setLpappData(dataSet);
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
    await saveAppData(data);
    console.log('Form Data ' , data);
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
