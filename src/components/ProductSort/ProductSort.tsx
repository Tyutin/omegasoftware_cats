import { useState } from 'react';
import './ProductSort.scss';
import Button from '../Button/Button';
import ProductSortForm, {
  ProductSortFormProps,
} from '../ProductSortForm/ProductSortForm';
import { LuFilter, LuFilterX } from 'react-icons/lu';

export default function ProductSort(props: ProductSortFormProps) {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  return (
    <div className="product-sort">
      <Button
        clickHandler={() => setIsFiltersVisible(!isFiltersVisible)}
        additionalClasses="product-sort__toggle"
        theme="blue"
      >
        {isFiltersVisible ? <LuFilterX /> : <LuFilter />}
        {isFiltersVisible ? 'Cкрыть фильтры' : 'Показать фильтры'}
      </Button>
      {isFiltersVisible && (
        <div className="product-sort__sort-form">
          <ProductSortForm {...props} />
        </div>
      )}
    </div>
  );
}
