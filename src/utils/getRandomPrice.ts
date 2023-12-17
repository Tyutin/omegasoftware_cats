import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE } from '../constants/product';

export default function getRandomPrice() {
  let rand = MIN_PRODUCT_PRICE + Math.random() * (MAX_PRODUCT_PRICE + 1 - MIN_PRODUCT_PRICE);
  return Math.floor(rand);
}