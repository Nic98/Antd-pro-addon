import axios from 'axios';

const API_URL_GET = 'http://localhost:3000/projectSchema/get';
const API_URL_POST = 'http://localhost:3000/projectSchema/save';
const API_URL_DELETE = 'http://localhost:3000/projectSchema/delete';

const defaultSchema = `{"version":"1.0.0","componentsMap":[{"devMode":"lowCode","componentName":"Page"}],"componentsTree":[{"componentName":"Page","id":"root","props":{},"fileName":"","hidden":false,"title":"","isLocked":false,"condition":true,"conditionGroup":""}],"i18n":{"zh - CN":{"i18n - jwg27yo4":"你好 ","i18n - jwg27yo3":"{ name } 博士"},"en - US":{"i18n - jwg27yo4":"Hello ","i18n - jwg27yo3":"Doctor { name } "}}}`;

export const addNewProjectSchemaToDB = async (name) => {
  const pageId = 'Lowcode-' + name; 

  const dataWithKey = {
    pageId: pageId,
    pageName: name,
    projectSchema: defaultSchema,
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

export const deleteProjectSchema = async (pageId) => { 
  try {
    const response = await axios.delete(API_URL_DELETE,   params: {
      pageId: pageId
    });
    console.log('Success:', response);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}