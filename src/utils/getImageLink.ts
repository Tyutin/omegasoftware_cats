import { SAYS_SEPARATOR } from '../constants/product'

type ImageLinkProps = {
  id: string,
  type?: 'square' | 'medium' | 'small' | 'xsmall'
  width?: number
  height?: number
}

export const getImageLink = ({id, type, width, height}: ImageLinkProps): string => { 
  let queryObject = {}
  let baseUrl = ''
  const [productId, says] = id.split(SAYS_SEPARATOR)
  if(says) {
    const fontSize = !!type && type !== 'medium' ? 20 : 50
    baseUrl = `https://cataas.com/cat/${productId}/says/${says}`
    queryObject = {type, width, height, says, fontSize, fontColor: '#5f5'}
  } else {
    baseUrl = `https://cataas.com/cat/${productId}`
    queryObject = {type, width, height}
  }
  const queryParams = Object.entries(queryObject)
    .map(([key, value]) => value ? `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}` : '')
    .filter(el => !!el)
    .join('&');
  return `${baseUrl}${!!queryParams ? '?' : ''}${queryParams}`
}