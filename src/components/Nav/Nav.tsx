import { NavLink } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__el">
          <NavLink to={'/'}>Главная</NavLink>
        </li>
        <li className="nav__el">
          <NavLink to={'/favorites'}>Избранное</NavLink>
        </li>
        <li className="nav__el">
          <NavLink to={'/cart'}>Корзина</NavLink>
        </li>
      </ul>
    </nav>
  );
}
