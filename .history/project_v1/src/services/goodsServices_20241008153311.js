import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods';
const API_URL_POST = 'http://localhost:3000/goods/add';
const API_URL_DELETE = 'http://localhost:3000/goods/delete';

export const getGoodsList = (data) => {
  return axios.get(API_URL_GET, data)
    .then(response => response.data)
    .catch(error => console.error('Error fetching data:', error));
};

export const addGoods = (data) => {
  const dataWithKey = { ...data, key: Date.now()};
  return axios.post(API_URL_POST, dataWithKey)
    .then(response => console.log('Success:', response.data))
    .catch(error => console.error('Error adding data:', error));
};

export const deleteGoods = (data) => {
  console.log(typeof(data._id));
  return axios.delete(API_URL_DELETE, null, { params: { _id: data._id } })
    .then(response => console.log('Success:', response.data))
    .catch(error => console.error('Error deleting data:', error));
}


export default {
  getGoodsList,
  addGoods,
  deleteGoods,
};