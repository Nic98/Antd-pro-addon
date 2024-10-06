import axios from 'axios';

const API_URL_GET = '/goods'

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data);
};

export default getGoodsList;