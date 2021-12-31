import React, {useEffect, useRef} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { AppState } from '../../contexts/AppContext';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { Box, Container, Button, LinearProgress } from '@mui/material';
import {
  LPApplicationInit,
  LPBusinessInfo,
  LPFinancialInfo,
  LPTeamInfo,
  LPMarketingPlans,
  LPDevTeamInfo,
  LPMoreInfo
} from '..';
import {doc, onSnapshot, setDoc} from '@firebase/firestore';
import { db } from '../../libs/dataStores/firebase';
import Loader from "react-loader-spinner";
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { UserSidebar } from '../../components';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  projectName: yup.string().required(),
  projectTicker: yup.string().required(),
  incorporated: yup.string().required(),
});

const LPApplicationProvider = () => {
  const { t } = useTranslation();
  const {setOpenDrawer, loading, setAlert, activeLPStep, activeAppId, lpappData, setLpappData, lpappUpdateTrigger, setLpappUpdateTrigger } = AppState();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: lpappData
  });
  const REVIEW_STEP = 7;
  const style = {
    loaderCenter: {
      zIndex: 99,
      margin: 'auto',
      left: '35%',
      position: 'fixed'
    }
  }

  // Flag to use as condition to suppress useEffects from running on mount
  const isMounted = useRef(false);

  let triggerCounter = lpappUpdateTrigger;

  // If user selects diff app, or if current app is updated, lets get app from db and set lpappData
  useEffect(() => {
    if (isMounted.current && activeAppId) {
      const appRef = doc(db, 'lpapps', activeAppId);

      // Unsubscribe firebase listener after use
      var unsubscribe = onSnapshot(appRef, (application) => {
        console.log('FireBase Data', application.data().application);
        if (application.exists()) {
          console.log('SETTING LAP APP DATA', application.data().application);
          setLpappData(application.data().application)
          // Prefills forms after a submit
          methods.reset(application.data().application);
        }
      })

      return () => {
        unsubscribe();
      }
    }
  }, [activeAppId, lpappUpdateTrigger])

  /* NOTES:  useEffect
    - To avoid useEffect's from rendering onLoad (when component mounts), which they all do even if limited by
       dependencies, set up an 'isMounted' flag & use it as a condition in useEffect instances with dependencies.
       Note that the effect to set 'isMounted' must always be the last useEffect as react runs them in the order they
        written
   */

  // This MUSt always be the last useEffect instance
  useEffect(() => {
    isMounted.current = true;
  }, [])


  // TODO put 'lpapps' in firebase config file I will used to map collections to identifiers

  const saveAppData = async (formData) => {
    // Context var that will trigger firebase watcher in AppContext to update lpappData so context is current
    triggerCounter++;
    const dataSet = {...lpappData, ...formData};
    const appRef = doc(db, 'lpapps', activeAppId);
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
    if (!activeAppId || activeAppId.length < 10)
    {
      setAlert({
        open: true,
        message: 'There is no application selected, please select or start one to continue',
        type: 'warning',
      });
      setOpenDrawer({left: true});
    } else {
      await saveAppData(data);
    }
  }

  return (
      <>
        {
          loading ? (
              <Box sx={{...style.loaderCenter}}>
                <Loader type="Audio" color="#40FF40" />
              </Box>
          ) : (
              <>
              <Box sx={{mx: 'auto', width: 600}}>
                <Container>
                  <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
                      <Box sx={ (activeLPStep === 0 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPApplicationInit />
                      </Box>
                      <Box sx={ (activeLPStep === 1 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPBusinessInfo />
                      </Box>
                      <Box sx={ (activeLPStep === 2 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPFinancialInfo />
                      </Box>
                      <Box sx={ (activeLPStep === 3 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPTeamInfo />
                      </Box>
                      <Box sx={ (activeLPStep === 4 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPMarketingPlans />
                      </Box>
                      <Box sx={ (activeLPStep === 5 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPDevTeamInfo />
                      </Box>
                      <Box sx={ (activeLPStep === 6 || activeLPStep === REVIEW_STEP) ? {display: 'block'} : {display: 'none' } }>
                        <LPMoreInfo />
                      </Box>
                      <Box>
                        <Button
                            variant='contained'
                            sx={{mt: 2}}
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
