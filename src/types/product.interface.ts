export interface ProductInterface {
  id: string,
  tags: string[],
  price: number,
}

export interface ProductInCartInterface extends Omit<ProductInterface, 'tags'> {
  count: number
}

export interface ProductResponseInterface {
  _id: string,
  mimetype: string,
  size: number,
  tags: string[]
}