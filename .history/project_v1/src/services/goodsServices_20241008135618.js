import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL_GET = 'http://localhost:3000/goods';
const API_URL_POST = 'http://localhost:3000/goods/add';

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data)
    .then(response => response.data)
    .catch(error => console.error('Error fetching data:', error));
};

export const addGoods = (data) => {
  const uniqueKey = uuidv4();
  const dataWithKey = { ...data, key: Date.now() };
  return axios.post(API_URL_POST, dataWithKey)
    .then(response => console.log('Success:', response.data))
    .catch(error => console.error('Error adding data:', error));
};

export default {
  getGoodsList,
  addGoods
};