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

  console.log('lpappData = ', lpappData);

  // TODO
  //  - when a logged in use wants to in initiate an app, I must generate a uuid, and create an app rec
  //    in firebase in lpapps, with a uid = to users uid from their auth record - not done here
  //  - then when saving app data, I save to lpapps with 'APP ID' as key  -- done here

  // TODO put 'lpapps' in firebase config file I will used to map collections to identifiers
  //   - this is like 'addToWatchList'
  // const saveAppData = async (formData) => {
  //   const appRef = doc(db, 'lpapps', user.uid);
  //   try {
  //     await setDoc(appRef, {
  //       appData: lpappData ? [...lpappData, formData] : formData,
  //     });
  //   } catch (error) {
  //     setAlert({
  //       open: true,
  //       message: error.message,
  //       type: 'error',
  //     })
  //   }
  // }

  const formSubmitHandler = (data) => {
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
