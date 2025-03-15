import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          key={movie.id}
          className={css.link}
          state={{ from: location }}
        >
          {movie.title}{" "}
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
