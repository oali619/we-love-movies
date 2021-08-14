const MoviesService = require("./movies.service");

async function list(req, res, next) {
  const { is_showing } = req.query;
  try {
    if (is_showing !== "true") {
      const movies = await MoviesService.getMovies();
      return res.json({ data: movies });
    }
    const movies = await MoviesService.getShowingMovies();
    res.json({ data: movies });
  } catch (error) {
    next(error);
  }
}

async function getMovieById(req, res, next) {
  const { movieId } = req.params;

  const foundMovie = await MoviesService.getMoviesById(movieId);

  if (!foundMovie) {
    return next({
      status: 404,
      message: `Movie not found. Incorrect id: ${movieId}`,
    });
  }
  res.json({ data: foundMovie });
}

async function getTheatersWhereMovieIsPlaying(req, res, next) {
  const { movieId } = req.params;

  const foundTheaters = await MoviesService.getTheatersWhereMovieIsPlaying(
    movieId
  );

  if (!foundTheaters) {
    return next({
      status: 404,
      message: `Movie not found. Incorrect id: ${movieId}`,
    });
  }
  res.json({ data: foundTheaters });
}

async function getAllReviewsForMovie(req, res, next) {
  const { movieId } = req.params;

  const foundReviews = await MoviesService.getAllReviewsForMovie(movieId);

  if (!foundReviews) {
    return next({
      status: 404,
      message: `Movie not found. Incorrect id: ${movieId}`,
    });
  }
  res.json({ data: foundReviews });
}

module.exports = {
  list,
  getMovieById,
  getTheatersWhereMovieIsPlaying,
  getAllReviewsForMovie,
};
