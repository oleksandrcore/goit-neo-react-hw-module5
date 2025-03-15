import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import { useEffect, useState } from "react";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCastDetails = async () => {
      const data = await getMovieCast(movieId);
      if (data) {
        setCast(data);
      }
    };

    fetchCastDetails();
  }, [movieId]);

  if (!cast) return <p>Loading...</p>;

  return (
    <ul className={css.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={css.item}>
          <img
            src={`https://image.tmdb.org/t/p/w92${actor.profile_path}`}
            alt={actor.name}
            className={css.img}
          />
          <p className={css.name}>{actor.name}</p>
          <p className={css.character}>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
