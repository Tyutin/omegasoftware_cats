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

export enum SortingVariants {
  DEFAULT = 'default',
  PRICE_ASC = 'priceAsc',
  PRICE_DESC = 'priceDesc',
  DATE_ASC = 'dateAsc',
  DATE_DESC = 'dateDesc',
}

export interface ProductSortingRulesInterface {
  sortBy: SortingVariants
  minPrice: number
  maxPrice: number
}