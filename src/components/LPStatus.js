import * as React from 'react';
import { Box, Button, Paper, Step, Stepper, StepContent, StepLabel, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { Trans } from 'react-i18next';
import { AppState } from '../contexts/AppContext';

// TODO - For more html parsing from translation.json text, I can use the following
// import parse from "html-react-parser";
// {parse(t(item.a))}

// TODO Can render the steps array dynamically
const steps = [
  {
    label: <Trans i18nKey='launchpad.steps.step0.label' />,
    description: <Trans i18nKey='launchpad.steps.step0.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step1.label' />,
    description: <Trans i18nKey='launchpad.steps.step1.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step2.label' />,
    description: <Trans i18nKey='launchpad.steps.step2.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step3.label' />,
    description: <Trans i18nKey='launchpad.steps.step3.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step4.label' />,
    description: <Trans i18nKey='launchpad.steps.step4.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step5.label' />,
    description: <Trans i18nKey='launchpad.steps.step5.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step6.label' />,
    description: <Trans i18nKey='launchpad.steps.step6.longDescription' />,
  },
  {
    label: <Trans i18nKey='launchpad.steps.step7.label' />,
    description: <Trans i18nKey='launchpad.steps.step7.longDescription' />,
  },
];

const LPStatus = () => {
  const { t } = useTranslation();
  const { activeLPStep, setActiveLPStep, user } = AppState();

  const handleNext = () => {
    setActiveLPStep((prevActiveLPStep) => prevActiveLPStep + 1);
  };

  const handleBack = () => {
    setActiveLPStep((prevActiveLPStep) => prevActiveLPStep - 1);
  };

  const handleReset = () => {
    setActiveLPStep(0);
  };

  return (
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeLPStep} orientation="vertical">
          {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                    optional={
                      index === steps.length-1 ? (
                          <Typography variant="caption">Click to review anytime</Typography>
                      ) : null
                    }
                    onClick={() => {
                      // Let user click on last step to review app anytime they want
                      if (index === 7) setActiveLPStep(index)
                    }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>
                    {step.description}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                          variant="contained"
                          onClick={handleNext}
                          sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
          ))}
        </Stepper>
        {activeLPStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
        )}
      </Box>
  );
}

export default LPStatus;
