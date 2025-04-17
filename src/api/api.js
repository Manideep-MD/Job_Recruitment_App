import axios from 'axios';
import {BASE_URL} from '@env';

export const fetchProducts = async () => {
  return await axios.get(`${BASE_URL}products`);
};

export const fetchProductDetails = async id => {
  return await axios.post(`${BASE_URL}products/${id}`);
};
