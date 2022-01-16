
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

/*
 * Filters for lpapps query function
 * all - get all apps
 * firstPreferPending - get first pending app, but if no pending apps but > 0 non-pending apps, return one
 */
const lpAppQueryType = {
  'ALL': 'all',
  'FIRST_PREFER_PENDING': 'firstPreferPending',
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

/*
 * Using this to mitigate some issues with firebase and react-form-hook
 * When I create a firebase application document for the first time I was only using userId, appId, and appStatus
 * This causes an issue when the user then updates the app the first time since some default values don't exist
 * as the initial app creation is done outsie the form context
 * This is I'm sure not necessary once I figure out how to use these tools better, as this will be a maintenance headache
 */
let lpFormObj = {
  'userId': '',
  'appId': '',
  'appStatus': '',
  'activePartnerships': '',
  'additionalInfo': '',
  'blockchainIndustry': '',
  'businessModel': '',
  'coreDevEducationLevels': '',
  'coreDevExperienceLevels': '',
  'coreDevLocations': '',
  'coreDevs': '',
  'country': '',
  'devCommitments': '',
  'devsInHouse': '',
  'email': '',
  'founderEmails': '',
  'fundingSource': '',
  'governanceModel': '',
  'incorporated': '',
  'initialFundraisingEfforts': '',
  'initialFundraisingStatus': '0',
  'lastUpdate': '',
  'licenseList': '',
  'licensing': '0',
  'licensingPlan': '0',
  'marketingInitiatives': '',
  'marketingPlan': '',
  'maxRaise': '',
  'mvp': '0',
  'opinionLetter': '0',
  'pendingPartnerships': '',
  'presalePrice': '',
  'projectName': '',
  'projectTicker': '',
  'publicPrice': '',
  'referrer': '',
  'region': '',
  'roadmap': '',
  'securityConcerns': '',
  'smartContract': '0',
  'socialFollowerCount': '',
  'teamKYC': '0',
  'teamMembers': '',
  'telegramChannelUrl': '',
  'telegramID': '',
  'tgeMarketcap': '',
  'tokenUtility': '',
  'tokenomics': '',
  'twitterUrl': '',
  'websiteUrl': '',
  'whitepaper': '',
  'youtubeUrl': '',
}

const getStep = (componentName) => {
  const obj = lpApplicationSteps.steps;
  return Object.keys(obj).find(key => obj[key].componentName === componentName);
}

export { lpApplicationSteps, lpAppQueryType, lpFormObj, lpStatusValues, lpStatusValueTooltips, lpStatusValueUrls, getStep };
