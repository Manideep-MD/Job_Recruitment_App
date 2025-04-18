import axios from 'axios';
import {BASE_URL} from '@env';

export const fetchJobsList = async () => {
  return await axios.get(`${BASE_URL}api/v0/jobs_list`);
};

// export const fetchProductDetails = async id => {
//   return await axios.post(`${BASE_URL}products/${id}`);
// };
