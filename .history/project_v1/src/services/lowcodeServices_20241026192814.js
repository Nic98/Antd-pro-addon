import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';








export const getProjectSchemaFromDB = async () => {
  try {
    const response = await axios.get(API_URL_GET);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};