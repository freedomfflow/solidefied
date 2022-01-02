import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { HistoricalChart } from '../config/api/coingecko';
import Loader from "react-loader-spinner";
import { Line } from 'react-chartjs-2';
// Do not remove the next 2 imports
import { Chart as ChartJS } from 'chart.js/auto';
import { Chart }            from 'react-chartjs-2';


const style = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    padding: 20,
    paddingTop: 0,
  }
};

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  // TODO put in a config file if we add more charts
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  // Make these part of user profile or appcontext??
  const currency = 'USD';
  const symbol = '$';

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));

    setHistoricData(data.prices);
  }

  useEffect(() => {
    fetchHistoricData();
  }, [days])


  return (
        <Box sx={{...style.container, width: { md: '75%'}, mt: { md: 2 }, p: {md: 5 }}}>
          {
            !historicData ? (
                <Loader type="Audio" color="#40FF40" />
            ) : (
                <>
                  <Line
                      data={{
                        labels: historicData.map((coin) => {
                          let date = new Date(coin[0]);
                          let time =
                              date.getHours() > 12
                                  ? `${date.getHours() -12} : ${date.getMinutes()} PM`
                                  : `${date.getHours()} : ${date.getMinutes()} AM`;

                          return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets: [
                          {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price (Past ${days} Days ) in ${currency}`,
                            borderColor: '#EEBC1D',
                          }
                        ],
                      }}
                      options={{
                        elements: {
                          point: {
                            radius: 1,
                          },
                        }
                      }}
                  />
                  <Box
                      sx={{
                        display: "flex",
                        mt: 2,
                        justifyContent: "space-around",
                        width: "100%",
                      }}
                  >
                    {chartDays.map((day) => (
                        <Button
                            key={day.value}
                            onClick={() => setDays(day.value)}
                            selected={day.value === days}
                        >
                          {day.label}
                        </Button>
                    ))}
                  </Box>
                </>
            )
          }
        </Box>
  );
};

export default CoinInfo;