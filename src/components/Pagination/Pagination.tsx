import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import './Pagination.scss';
import useDebounce from '../../hooks/useDebounce';
import { useBoundStore } from '../../store/useBoundStore';

export default function Pagination() {
  const currentPageNumber = useBoundStore((state) => state.currentPageNumber);
  const paginationCount = useBoundStore((state) => state.paginationCount);
  const setCurrentPageNumber = useBoundStore(
    (state) => state.setCurrentPageNumber
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputClick = () => {
    inputRef.current?.select();
  };
  const [inputValue, setInputValue] = useState(currentPageNumber);

  const onChangePageInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value.replace(/[^0-9]/g, ''));
    if (Number.isNaN(value)) {
      setInputValue(currentPageNumber);
      return;
    }
    const valueToSet =
      value > paginationCount() ? paginationCount() : value < 1 ? 1 : value;
    setInputValue(valueToSet);
  };

  const debounceInputValue = useDebounce<number>(inputValue, 800);

  useEffect(() => {
    setCurrentPageNumber(debounceInputValue);
  }, [debounceInputValue, setCurrentPageNumber]);

  const incrementPageNumber = () => {
    setCurrentPageNumber(currentPageNumber + 1);
    setInputValue(currentPageNumber + 1);
  };

  const decrementPageNumber = () => {
    setCurrentPageNumber(currentPageNumber - 1);
    setInputValue(currentPageNumber - 1);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__element">
          <button
            className={classNames('pagination__button', {
              pagination__button_disabled: currentPageNumber === 1,
            })}
            disabled={currentPageNumber === 1}
            onClick={() => decrementPageNumber()}
          >
            <IoIosArrowBack size={20} />
          </button>
        </li>
        <li className="pagination__element">
          <input
            type="text"
            value={inputValue}
            size={paginationCount().toString().length}
            className="pagination__input"
            onChange={onChangePageInput}
            ref={inputRef}
            onClick={handleInputClick}
          />
        </li>
        <li className="pagination__element">
          <span>/</span>
        </li>
        <li className="pagination__element">
          <span>{paginationCount()}</span>
        </li>
        <li className="pagination__element">
          <button
            className={classNames('pagination__button', {
              pagination__button_disabled:
                currentPageNumber === paginationCount(),
            })}
            disabled={currentPageNumber === paginationCount()}
            onClick={() => incrementPageNumber()}
          >
            <IoIosArrowForward size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
}
