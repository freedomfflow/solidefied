
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

const getStep = (componentName) => {
  const obj = lpApplicationSteps.steps;
  return Object.keys(obj).find(key => obj[key].componentName === componentName);
}

export { lpApplicationSteps, lpStatusValues, getStep };
