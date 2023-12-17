import { Range, getTrackBackground } from 'react-range';

import './RangeSelect.scss';
import { MAX_PRODUCT_PRICE, MIN_PRODUCT_PRICE } from '../../constants/product';

const STEP = 10;

type RangeSelectProps = {
  values: number[];
  setValues: (values: number[]) => void;
};

export default function RangeSelect({ values, setValues }: RangeSelectProps) {
  return (
    <div className="range-select">
      <Range
        values={values}
        step={STEP}
        min={MIN_PRODUCT_PRICE}
        max={MAX_PRODUCT_PRICE}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="range-select__line-wrapper"
            style={{
              ...props.style,
            }}
          >
            <div
              ref={props.ref}
              className="range-select__line"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#ccc', '#a296ff', '#ccc'],
                  min: MIN_PRODUCT_PRICE,
                  max: MAX_PRODUCT_PRICE,
                }),
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            className="range-select__thumb"
            style={{
              ...props.style,
            }}
          >
            <div className="range-select__thumb-value">
              {values[index].toFixed(1)}
            </div>
          </div>
        )}
      />
    </div>
  );
}
