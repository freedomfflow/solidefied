import {COINGECKO} from '../constants';

const RATE_API_PARAMS = {
  coingecko: {
    apiUrl: "https://api.coingecko.com/api/v3/simple/price?ids=xxTOKENxx&vs_currencies=xxCURRENCYxx",
    tokens: {
      yfdai: 'yfdai-finance',
      tether: 'tether',
      ethereum: 'ethereum',
      oneinch: '1inch'
    }
  }
}

const getTokenForApiUrl = (token, source) => {
  let apiUrl = '';
  if (source === COINGECKO) {
    apiUrl = RATE_API_PARAMS[COINGECKO].apiUrl;
  }
  switch (token) {
    case 'yfdai':
      if (source === COINGECKO) {
        let tempUrl = apiUrl.replace('xxTOKENxx', RATE_API_PARAMS[COINGECKO].tokens[token]);
        apiUrl = tempUrl.replace('xxCURRENCYxx', 'USD');
      }
      break;
    case 'ethereum':
      if (source === COINGECKO) {
        let tempUrl = apiUrl.replace('xxTOKENxx', RATE_API_PARAMS[COINGECKO].tokens[token]);
        apiUrl = tempUrl.replace('xxCURRENCYxx', 'USD');
      }
      break;
    case 'tether':
      if (source === COINGECKO) {
        let tempUrl = apiUrl.replace('xxTOKENxx', RATE_API_PARAMS[COINGECKO].tokens[token]);
        apiUrl = tempUrl.replace('xxCURRENCYxx', 'USD');
      }
      break;
    case 'oneinch':
      if (source === COINGECKO) {
        let tempUrl = apiUrl.replace('xxTOKENxx', RATE_API_PARAMS[COINGECKO].tokens[token]);
        apiUrl = tempUrl.replace('xxCURRENCYxx', 'USD');
      }
      break;
  }

  return apiUrl;
}

export async function getUSDRate(api, token) {
  switch (api) {
    case COINGECKO:
      const apiUrl =  await getTokenForApiUrl(token, api);
      const response = await fetch(apiUrl);
      return response.json().then((jsonData) => {
        try {
          return jsonData[RATE_API_PARAMS[COINGECKO].tokens[token]].usd;
        }
        catch (e) {
          // TODO handle this gracefully as it will cause data errors the user will see
          console.log('ERROR', e);
        }
      });
  }
}