
const lpApplicationSteps = {
  totalSteps: 8,
  steps: {
    step0: {
      componentName: 'LPApplicationInit',
    },
    step1: {
      componentName: 'LPBusinessInfo',
    },
    step2: {
      componentName: 'LPFinancialInfo',
    },
    step3: {
      componentName: 'LPTeamInfo',
    },
    step4: {
      componentName: 'LPMarketingPlans',
    },
    step5: {
      componentName: 'LPDevTeamInfo',
    },
    step6: {
      componentName: 'LPMoreInfo',
    },
  }
}

const lpStatusValues = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REJECTED: 'rejected',
  PRE_LAUNCH: 'pre_launch',
  ACTIVE_FUNDING: 'active_funding',
  LAUNCHED: 'launched',
}

// TODO need to update these
const lpStatusValueUrls = {
  PENDING: '/launchpad/application',
  SUBMITTED: '/launchpad',
  UNDER_REVIEW: '/launchpad',
  REJECTED: '',
  PRE_LAUNCH: '',
  ACTIVE_FUNDING: '',
  LAUNCHED: '',
}

const lpStatusValueTooltips = {
  PENDING: 'Your application has not yet been submitted. Complete your application and submit it for review.',
  SUBMITTED: 'You have submitted this application and it is currently under review.  You can no longer modify the application, but you can review the details.',
  UNDER_REVIEW: 'under_review',
  REJECTED: 'rejected',
  PRE_LAUNCH: 'pre_launch',
  ACTIVE_FUNDING: 'active_funding',
  LAUNCHED: 'launched',
}

const getStep = (componentName) => {
  const obj = lpApplicationSteps.steps;
  return Object.keys(obj).find(key => obj[key].componentName === componentName);
}

export { lpApplicationSteps, lpStatusValues, lpStatusValueTooltips, lpStatusValueUrls, getStep };
