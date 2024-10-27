import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';

export const addNewProjectSchemaToDB = async (name) => {
  const pageId = 'Lowcode' + name; 

  const dataWithKey = {
    pageId: pageId,
    pageName: name,
    projectSchema: "",
  }
  try {
    const response = await axios.post(API_URL_POST, dataWithKey);
    console.log('Success:', response);
  } catch (error) {
    console.error('Error adding data:', error);
    throw error;
  }
}

export const getProjectSchemaFromDB = async () => {
  try {
    const response = await axios.get(API_URL_GET);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};