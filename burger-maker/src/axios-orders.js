import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-d65b8.firebaseio.com'
});

export default instance;
