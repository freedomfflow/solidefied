
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

const getStep = (componentName) => {
  const obj = lpApplicationSteps.steps;
  return Object.keys(obj).find(key => obj[key].componentName === componentName);
}

export { lpApplicationSteps, getStep };
