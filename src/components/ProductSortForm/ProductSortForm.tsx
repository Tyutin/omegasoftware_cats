import Select from 'react-select';
import Button from '../Button/Button';
import { useFormik } from 'formik';

import './ProductSortForm.scss';
import {
  ProductSortingRulesInterface,
  SortingVariants,
} from '../../types/product.interface';
import RangeSelect from '../RangeSelect/RangeSelect';
import { DEFAULT_PRODUCT_SORTING_RULES } from '../../constants/product';

const defaultSortOptions: { value: SortingVariants; label: string }[] = [
  {
    value: SortingVariants.DEFAULT,
    label: 'По умолчанию',
  },
  {
    value: SortingVariants.PRICE_ASC,
    label: 'Цена по возрастанию',
  },
  {
    value: SortingVariants.PRICE_DESC,
    label: 'Цена по убыванию',
  },
  // {
  //   value: SortingVariants.DATE_ASC,
  //   label: 'Дата по возрастанию',
  // },
  // {
  //   value: SortingVariants.DATE_DESC,
  //   label: 'Дата по убыванию',
  // },
];

export type ProductSortFormProps = {
  sortingRules: ProductSortingRulesInterface;
  setSortingRules: (values: ProductSortingRulesInterface) => void;
  withPriceFilter?: boolean;
};

export default function ProductSortForm({
  sortingRules,
  setSortingRules,
  withPriceFilter = false,
}: ProductSortFormProps) {
  const { sortBy, maxPrice, minPrice } = sortingRules;
  const sortOptions = defaultSortOptions;
  const formik = useFormik<ProductSortingRulesInterface>({
    initialValues: {
      sortBy,
      minPrice,
      maxPrice,
    },
    onSubmit(values) {
      setSortingRules(values);
    },
  });

  const handleRangeSelect = (values: number[]) => {
    formik.setFieldValue('minPrice', values[0]);
    formik.setFieldValue('maxPrice', values[1]);
  };

  const resetSortingRules = () => {
    formik.setValues(DEFAULT_PRODUCT_SORTING_RULES);
    formik.handleSubmit();
  };

  return (
    <form onSubmit={formik.handleSubmit} className="product-sort-form">
      <label className="product-sort-form__label">
        <span>Сортировать по:</span>
        <Select
          id="sortBy"
          name="sortBy"
          isSearchable={false}
          options={sortOptions}
          value={sortOptions.find(
            (option) => option.value === formik.values.sortBy
          )}
          onChange={(selectedOption) =>
            formik.setFieldValue('sortBy', selectedOption?.value)
          }
        />
      </label>
      {withPriceFilter && (
        <label>
          <span>Цена от/до</span>
          <RangeSelect
            values={[formik.values.minPrice, formik.values.maxPrice]}
            setValues={handleRangeSelect}
          />
        </label>
      )}
      <Button type="submit" clickHandler={formik.handleSubmit} theme="blue">
        Применить
      </Button>
      <Button type="submit" clickHandler={resetSortingRules}>
        Сбросить
      </Button>
    </form>
  );
}
