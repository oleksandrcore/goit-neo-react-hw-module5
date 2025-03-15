import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";


const isActiveLink = ({ isActive }) => {
  return clsx(css.link, { [css.active]: isActive });
};

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={isActiveLink}>Home</NavLink>
      <NavLink to="/movies" className={isActiveLink}>Movies</NavLink>
    </nav>
  );
};

export default Navigation;
