import useIsMobile from '../../hooks/useIsMobile';

import './Header.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function Header() {
  const { isMobile } = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header">
      <span>Kiki's catpic seller service</span>
      {isMobile && (
        <button
          className={classNames(
            'header__toggle',
            isMenuOpen && 'header__toggle_active'
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      )}
      <nav
        className={classNames(
          'header__nav',
          isMenuOpen && isMobile && 'header__nav_active'
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <ul className="header__nav-list">
          <li className="header__nav-el">
            <NavLink className="header__nav-link" to={'/'}>
              Главная
            </NavLink>
          </li>
          <li className="header__nav-el">
            <NavLink className="header__nav-link" to={'/find'}>
              Поиск
            </NavLink>
          </li>
          <li className="header__nav-el">
            <NavLink className="header__nav-link" to={'/favorites'}>
              Избранное
            </NavLink>
          </li>
          <li className="header__nav-el">
            <NavLink className="header__nav-link" to={'/cart'}>
              Корзина
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
