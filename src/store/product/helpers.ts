import axios, { AxiosError } from 'axios';
import { ProductInterface, ProductResponseInterface } from '../../types/product.interface';
import getRandomPrice from '../../utils/getRandomPrice';

export const getTotalProductsCount = async ():Promise<number | AxiosError> => {
  try {
    const totalProductsCountResponse = await axios.get<{ count: number }>(
      'https://cataas.com/api/count'
    );
    return totalProductsCountResponse.data.count
  } catch (error) {
    return error as AxiosError
  }
}

export const getProductsForPage = async (skip: number, limit: number):Promise<ProductInterface[] | AxiosError> => {
  try {
    const productsResponse = await axios.get<ProductResponseInterface[]>(
      `https://cataas.com/api/cats?limit=${limit}&skip=${skip}`
    );
    return productsResponse.data.map((el) => {
      return {
        id: el._id,
        tags: el.tags,
        price: getRandomPrice(),
      };
    })
  } catch (error) {
    return error as AxiosError
  }
}