import axios from 'axios';
import { ProductType } from '../types/productsType';
import { BrandsType } from '../types/brandsType';

export const catalogAPI = {
  getProducts: async () => {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const products = await axios.get<ProductType[]>('products.json');
    return products.data;
  },
  getBrands: async () => {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const brands = await axios.get<BrandsType[]>('brands.json');
    return brands.data;
  },
};
