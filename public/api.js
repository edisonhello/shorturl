
import Axios from 'axios';

export const axios = Axios.create({
  baseURL: '/api/',
});

function updateToken() {
  // axios.defaults.headers['AuthToken'] = 
}

export async function get(path) {
  // await updateToken();
  const result = await axios.get(path);
  return result.data;
}

export async function post(path, data) {
  // await updateToken();
  const result = await axios.post(path, data);
  return result.data;
}
