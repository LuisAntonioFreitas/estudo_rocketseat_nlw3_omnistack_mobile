import axios from 'axios';
import sessionConfig  from "react-native-config";

const api = axios.create({
  baseURL: sessionConfig.REACT_APP_BASE_URL
});

export default api;