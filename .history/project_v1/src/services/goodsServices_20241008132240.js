import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods'

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data)
    .then(response => response.data)
    .catch(error => console.error('Error fetching data:', error));
};

export const 


export default getGoodsList;