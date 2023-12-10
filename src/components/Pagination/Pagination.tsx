import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import './Pagination.scss';
import useDebounce from '../../hooks/useDebounce';

type PaginationProps = {
  paginationCount: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
};

export default function Pagination(props: PaginationProps) {
  const { paginationCount, currentPage, setCurrentPage } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const handleInputClick = () => {
    inputRef.current?.select();
  };

  const [inputValue, setInputValue] = useState(currentPage);

  const onChangePageInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(event.target.value.replace(/[^0-9]/g, ''));
    if (Number.isNaN(value)) {
      setInputValue(currentPage);
      return;
    }
    const valueToSet =
      value > paginationCount ? paginationCount : value < 1 ? 1 : value;
    setInputValue(valueToSet);
  };

  const debounceInputValue = useDebounce<number>(inputValue, 800);

  useEffect(() => {
    setCurrentPage(debounceInputValue);
  }, [debounceInputValue, setCurrentPage]);

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__element">
          <button
            className={classNames('pagination__button', {
              pagination__button_disabled: currentPage === 1,
            })}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <IoIosArrowBack size={20} />
          </button>
        </li>
        <li className="pagination__element">
          <input
            type="text"
            value={inputValue}
            size={paginationCount.toString().length}
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
          <span>{paginationCount}</span>
        </li>
        <li className="pagination__element">
          <button
            className={classNames('pagination__button', {
              pagination__button_disabled: currentPage === paginationCount,
            })}
            disabled={currentPage === paginationCount}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <IoIosArrowForward size={20} />
          </button>
        </li>
      </ul>
    </div>
  );
}
