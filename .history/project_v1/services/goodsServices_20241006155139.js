import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/goods/'

export function getGoodsList() { 
  return axios.get(API_URL_GET)
}