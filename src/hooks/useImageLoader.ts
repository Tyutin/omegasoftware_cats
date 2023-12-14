import { useState, useEffect } from 'react';

interface ImageLoaderProps {
  imageUrl: string;
  maxRetries?: number;
  errorMessage?: string;
}

interface ImageLoaderState {
  loading: boolean;
  errorMessage: string | null;
}

export const useImageLoader = ({ imageUrl, maxRetries = 3, errorMessage = 'Не удалось загрузить изображение' }: ImageLoaderProps): ImageLoaderState => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const image = new Image();

    const handleLoad = () => {
      setLoading(false);
    };

    const handleError = () => {
      if (retryCount < maxRetries - 1) {
        setRetryCount(retryCount + 1);
        image.src = imageUrl;
      } else {
        setLoading(false);
        setError(errorMessage);
      }
    };

    image.addEventListener('load', handleLoad);
    image.addEventListener('error', handleError);

    image.src = imageUrl;

    return () => {
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    };
  }, [imageUrl, maxRetries, errorMessage, retryCount]);

  return { loading, errorMessage: error };
};