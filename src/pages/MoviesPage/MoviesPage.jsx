import css from "./MoviesPage.module.css";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const queryValue = form.elements.query.value.trim();

    if (queryValue === "") {
      form.reset();
      return;
    }

    setSearchParams({ query: queryValue });

    form.reset();
  };

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        const data = await searchMovies(query);
        if (data) {
          setMovies(data);
        }
      };
      fetchMovies();
    }
  }, [query]);

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.searchBar}>
        <div className={css.inputContainer}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            name="query"
            defaultValue={query}
            className={css.searchInput}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </div>
      </form>

      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
