import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../api";
import { useEffect, useState } from "react";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const data = await getTrendingMovies();

      if (data) {
        setMovies(data);
      } else {
        console.error("No data received for trending movies");
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
