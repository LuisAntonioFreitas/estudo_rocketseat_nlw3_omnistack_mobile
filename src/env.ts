import sessionConfig  from "react-native-config";


sessionConfig.REACT_APP_NAME = 'Happy';

sessionConfig.REACT_APP_API_KEY = '';

sessionConfig.REACT_APP_SERVER_PORT = '3000';
sessionConfig.REACT_APP_BASE_URL = 'http://www.backend.com/api/';

sessionConfig.REACT_APP_DEV_SERVER_PORT = '3333';
sessionConfig.REACT_APP_DEV_BASE_URL = 'http://localhost:{REACT_APP_DEV_SERVER_PORT}/';


// Define variáveis de ambiente
const NODE_ENV = process.env['NODE_ENV']?.trim().toLowerCase();

if (NODE_ENV === 'development') {
  // development
  sessionConfig.REACT_APP_SERVER_PORT = sessionConfig.REACT_APP_DEV_SERVER_PORT;

  sessionConfig.REACT_APP_BASE_URL = sessionConfig.REACT_APP_DEV_BASE_URL?.replace(/{REACT_APP_DEV_SERVER_PORT}/, `${sessionConfig.REACT_APP_DEV_SERVER_PORT}`);
} else {
  // production
  sessionConfig.REACT_APP_BASE_URL = sessionConfig.REACT_APP_BASE_URL?.replace(/{REACT_APP_SERVER_PORT}/, `${sessionConfig.REACT_APP_SERVER_PORT}`);
}

export default NODE_ENV;