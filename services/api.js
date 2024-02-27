import axios from 'axios';

export default () => {

  return axios.create({
    baseURL: process.env.API_URL,
    withCredentials: false,
    headers: {    
      'NEX-APIKEY': 'apikey-1234567890',
    }
  });
}
