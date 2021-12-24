import React from 'react';
import { LPApplicationLayout } from '../layouts';
import { LPApplicationProvider } from '../forms';

const LaunchpadApplicationPage = () => {
  return (
      <>
        <LPApplicationLayout>
          <LPApplicationProvider />
        </LPApplicationLayout>
      </>
  );
};

export default LaunchpadApplicationPage;
