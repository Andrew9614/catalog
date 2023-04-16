import axios from 'axios';
import { ProductType } from '../types/productsType';
import { BrandsType } from '../types/brandsType';

export const catalogAPI = {
  getProducts: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, Math.random()*1000);
    });
    const products = await axios.get<ProductType[]>('products.json');
    return products.data;
  },
  getBrands: async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, Math.random()*1000);
    });
    const brands = await axios.get<BrandsType[]>('brands.json');
    return brands.data;
  },
};

export const shoppingCartAPI = {
  postOrders: async (orders: { product: ProductType; count: number }[]) => {
    const res = await axios.post(
      'http://localhost:8010/proxy/js/confirm.php',
      orders
    );
    return res;
  },
};
