import React from 'react';

const HomePage = () => {
  return (
      <>
        <h1>HOME PAGE</h1>
        <p>{process.env.NODE_ENV}</p>
        <p>{process.env.REACT_APP_MY_API_KEY}</p>
      </>
  );
};

export default HomePage;
