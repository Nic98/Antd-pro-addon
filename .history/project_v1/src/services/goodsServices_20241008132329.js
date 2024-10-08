import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods'
const API_URL_POST = 'http://localhost:3000/goods/add'

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data)
    .then(response => response.data)
    .catch(error => console.error('Error fetching data:', error));
};

export const addGoods = (data) => {
  return axios.post(API_URL_POST, data)
    .then(response => response.data)
    .catch(error => console.error('Error adding data:', error));
};


export default getGoodsList; addGoods;