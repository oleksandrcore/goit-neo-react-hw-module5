import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api";
import { useEffect, useState } from "react";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchCastDetails = async () => {
      const data = await getMovieReviews(movieId);
      if (data) {
        setReviews(data);
      }
    };

    fetchCastDetails();
  }, [movieId]);

  if (!reviews) return <p>Loading...</p>;

  return (
    <div className={css.container}>
      {reviews.length === 0 ? (
        <p>We don&apos;t have any reviews for this movie</p>
      ) : (
        <>
          <ul className={css.list}>
            {reviews.map((review) => (
              <li key={review.id} className={css.item}>
                <p className={css.author}>Author: {review.author}</p>
                <p className={css.content}>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieReviews;
