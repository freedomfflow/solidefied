import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { TrendingCoins } from '../config/api/coingecko';
import AliceCarousel from 'react-alice-carousel';
import { useNavigate } from 'react-router-dom';

let style = {
  carousel: {
    display: 'flex',
    alignItems: 'center',
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
};

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);

  // const { currency, symbol } = CryptoState();
  const currency = 'USD';
  const symbol = '$';

  const navigate = useNavigate();

  const fetchTrendingCoins = async () => {
    const {data} = await axios.get(TrendingCoins(currency))
    setTrending(data);
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
        <Box
            sx={style.carouselItem}
            onClick={() => navigate(`/coins/${coin.id}`)}
        >
          <img
              src={coin?.image}
              alt={coin.name}
              height='40'
              style={{marginBottom: 8}}
          />
          <Box sx={{mb: 2, display: 'flex', justifyContent: 'row'}}>
            {coin?.symbol}
            &nbsp;
            <Box sx={{color: profit > 0 ? 'rgb(14, 203, 129)' : 'red'}}>
              {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
            </Box>
          </Box>
          <Box sx={{fontSize: 16, fontWeight: 500}}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
          </Box>
        </Box>
    );
  })

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
      <Box sx={style.carousel}>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay={true}
            items={items}
        />
      </Box>
  );
};

export default Carousel;