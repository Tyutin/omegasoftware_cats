import axios, { AxiosError } from 'axios';
import { ProductInterface, ProductResponseInterface } from '../../types/product';
import getRandomPrice from '../../utils/getRandomPrice';

export async function getProductsByTags(tags: string[]): Promise<ProductInterface[] | AxiosError> {
  if(!tags.length) {
    return []
  }
  try {
    const productsResponse = await axios.get<ProductResponseInterface[]>(
      `https://cataas.com/api/cats?tags=${tags.join(',')}`
    );
    return productsResponse.data.map(product => {
      return {
        id: product._id,
        tags,
        price: getRandomPrice()
      }
    })
  } catch (error) {
    return error as AxiosError
  }
}