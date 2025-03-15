import axios from "axios";

const THEMOVIEDB_TOKEN = process.env.THEMOVIEDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${THEMOVIEDB_TOKEN}`,
  },
};

export async function getTrendingMovies() {
  try {
    const { data } = await axios.get("/trending/movie/day", options);
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
}

export async function getMovieDetails(movieId) {
  try {
    const { data } = await axios.get(`/movie/${movieId}`, options);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

export async function getMovieCast(movieId) {
  try {
    const { data } = await axios.get(`/movie/${movieId}/credits`, options);
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
  }
}

export async function getMovieReviews(movieId) {
  try {
    const { data } = await axios.get(`/movie/${movieId}/reviews`, options);
    return data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
  }
}

export async function searchMovies(query) {
  try {
    const { data } = await axios.get(`/search/movie?query=${query}`, options);
    return data.results;
  } catch (error) {
    console.error("Error searching for movies:", error);
  }
}
