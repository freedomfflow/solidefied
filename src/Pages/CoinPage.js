import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api/coingecko';
import {
  Box,
  Typography
} from '@mui/material';
import { CoinInfo} from '../components';
import {numberWithCommas} from '../components/Carousel';
import Loader from "react-loader-spinner";
// import ReactHtmlParser from 'react-html-parser';
import { AppState } from '../contexts/AppContext';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sidebar: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 5,
    borderRight: '2px solid grey'
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    width: '100%',
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: 'justify'
  },
  marketData: {
    alignSelf: 'start',
    padding: 5,
    width: '100%',
    // [theme.breakpoints.down('md')]: {
    //   display: 'flex',
    //   justifyContent: 'space-around'
    // },
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column',
    //   alignItems: 'center'
    // },
    // [theme.breakpoints.down('xs')]: {
    //   alignItems: 'start'
    // },
  }
};

// TODO - need html parser for descriptions not to blow up
// TODO - create styles from xs size and then as sx styles for md & up where needed

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { setAlert } = AppState();
  const currency = 'USD';
  const symbol = '$';

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <Loader type="Audio" color="#40FF40" />

  return (
      <Box sx={{...style.container, flexDirection: { md: 'row'}}}>
        <Box sx={style.sidebar}>
          <img
              src = {coin?.image.large}
              alt = {coin?.name}
              height = '100'
              style = {{ marginBottom: 10 }}
          />
          <Typography
              variant='h5'
              sx={style.heading}
          >
            {coin?.name}
          </Typography>
          <Typography
              variant='subtitle1'
              sx={style.description}
          >
            {coin?.description.en.split('. ')[0]}
            {/*{ReactHtmlParser(coin?.description.en.split('. ')[0])}.*/}
          </Typography>
          <Box sx={style.marketData}>
            <Box sx={{ display: 'flex'}}>
              <Typography variant='h7' sx={style.heading}>
                Rank
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h7' >
                {coin?.market_cap_rank}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex'}}>
              <Typography variant='h7' sx={style.heading} >
                Current Price:
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h7'>
                {symbol}{' '}
                {numberWithCommas(
                    coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>
            <Box
                sx={{ display: 'flex'}}>
              <Typography variant='h7' sx={style.heading} >
                Market Cap
              </Typography>
              &nbsp;&nbsp;
              <Typography variant='h7' >
                {symbol}{' '}
                {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                )}
                &nbsp;M
              </Typography>
            </Box>
          </Box>
        </Box>
        <CoinInfo coin={coin} />
      </Box>
  );
};

export default CoinPage;
