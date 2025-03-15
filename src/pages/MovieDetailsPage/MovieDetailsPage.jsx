import {
  Link,
  Outlet,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import css from "./MovieDetailsPage.module.css";
import { getMovieDetails } from "../../api";
import { useEffect, useState } from "react";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const data = await getMovieDetails(movieId);
      if (data) {
        setMovie(data);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <button onClick={handleGoBack} className={css.goBackButton}>
        Go Back
      </button>
      <div className={css.movieDetailsContainer}>
        <div className={css.poster}>
          <img
            src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} ({movie.release_date.slice(0, 4)})
          </h1>
          <p>User score: {Math.round((movie.vote_average * 10) * 100)/100}%</p>
          <h2 className={css.subtitle}>Overview</h2>
          <p>{movie.overview}</p>
          <h2 className={css.subtitle}>Genres</h2>
          <ul className={css.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <p>Additional information</p>
        <ul className={css.links}>
          <Link
            to="cast"
            className={css.link}
            state={{ from: location.state?.from || "/movies" }}
          >
            Cast
          </Link>
          <Link
            to="reviews"
            className={css.link}
            state={{ from: location.state?.from || "/movies" }}
          >
            Reviews
          </Link>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
