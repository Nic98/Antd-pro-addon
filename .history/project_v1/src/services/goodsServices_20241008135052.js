import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods';
const API_URL_POST = 'http://localhost:3000/goods/add';

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data)
    .then(response => response.data)
    .catch(error => console.error('Error fetching data:', error));
};

export const addGoods = (data) => {
  const uniqueKey = uuidv4();
  const dataWithKey = { ...data, key: uniqueKey };
  return axios.post(API_URL_POST, dataWithKey)
    .then(response => response.dataWithKey)
    .catch(error => console.error('Error adding data:', error));
};

export default {
  getGoodsList,
  addGoods
};