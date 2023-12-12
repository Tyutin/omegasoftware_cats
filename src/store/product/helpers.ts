import axios, { AxiosError } from 'axios';
import { ProductInCartInterface, ProductInterface, ProductResponseInterface } from '../../types/product.interface';
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

export const getProductsForPage = async (skip: number, limit: number, storedProducts: (ProductInterface |ProductInCartInterface)[]):Promise<ProductInterface[] | AxiosError> => {
  try {
    const productsResponse = await axios.get<ProductResponseInterface[]>(
      `https://cataas.com/api/cats?limit=${limit}&skip=${skip}`
    );
    return productsResponse.data.map((responseProduct) => {
      const storedProduct = storedProducts.find(el => el.id === responseProduct._id)
      return {
        id: responseProduct._id,
        tags: responseProduct.tags,
        price: storedProduct?.price || getRandomPrice(),
      };
    })
  } catch (error) {
    return error as AxiosError
  }
}