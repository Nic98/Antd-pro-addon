import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods'

export const getGoodsList = (data) => {
  return axios.post(API_URL, data);
};

export default getGoodsList;