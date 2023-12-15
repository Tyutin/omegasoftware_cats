type ImageLinkProps = {
  id: string,
  type?: 'square' | 'medium' | 'small' | 'xsmall'
  width?: number
  height?: number
}

export const getImageLink = ({id, type, width, height}: ImageLinkProps): string => {
  const baseUrl = `https://cataas.com/cat/${id}`
  const queryParams = Object.entries({type, width, height})
    .map(([key, value]) => value ? `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}` : '')
    .filter(el => !!el)
    .join('&');
  return `${baseUrl}${!!queryParams ? '?' : ''}${queryParams}`
}