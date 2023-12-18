import axios, { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { ProductInterface } from '../../types/product';
import { getProductsByTags } from './helpers';
import ProductList from '../../components/ProductList/ProductList';
export default function FindPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<AxiosError>();
  const [tagsFromApi, setTagsFromApi] = useState<string[]>([]);
  const [currentTagsOptions, setCurrentTagsOptions] = useState<
    MultiValue<{
      value: string;
      label: string;
    }>
  >([]);
  const [products, setProducts] = useState<ProductInterface[]>([]);

  const initialTagsOptionsRef = useRef(
    (searchParams.get('tags')?.split(',') || []).map((el) => {
      return {
        label: el,
        value: el,
      };
    })
  );

  useEffect(() => {
    axios
      .get<string[]>('https://cataas.com/api/tags')
      .then((response) => {
        response.data.shift();
        const availableTagsOptions = initialTagsOptionsRef.current.filter(
          (el) => response.data.includes(el.value)
        );
        setCurrentTagsOptions(availableTagsOptions);
        setTagsFromApi(response.data);
      })
      .catch((axiosError) => setError(axiosError as AxiosError));
  }, [setCurrentTagsOptions, initialTagsOptionsRef, setTagsFromApi]);

  useEffect(() => {
    const handleData = async () => {
      const newSearchParams = new URLSearchParams();
      const tags = currentTagsOptions.map((el) => el.value);
      if (currentTagsOptions.length) {
        newSearchParams.set('tags', tags.join(','));
      }
      setSearchParams(newSearchParams);
      const productResponse = await getProductsByTags(tags);
      if (Array.isArray(productResponse)) {
        setProducts(productResponse);
      } else {
        setError(productResponse);
      }
    };
    handleData();
  }, [currentTagsOptions, setSearchParams]);

  if (error) {
    return (
      <div className="page find-page">
        <ErrorMessage error={error} alertText="Ошибка загрузки тегов" />
      </div>
    );
  }
  return (
    <div className="page find-page">
      <Select
        options={tagsFromApi.map((el) => {
          return {
            value: el,
            label: el,
          };
        })}
        isMulti
        value={currentTagsOptions}
        onChange={(options) => setCurrentTagsOptions(options)}
        placeholder="Выберите теги"
      />
      {!!products.length && <ProductList products={products} />}
    </div>
  );
}
