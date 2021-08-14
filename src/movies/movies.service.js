const db = require("../db/connection");

const MoviesService = {
  getMovies() {
    return db("movies").select("*");
  },
  getShowingMovies() {
    return db("movies")
      .select("movies.*")
      .join("movies_theaters", "movies.movie_id", "movies_theaters.movie_id")
      .where("movies_theaters.is_showing", true)
      .distinct();
  },
  getMoviesById(id) {
    return db("movies")
      .select("*")
      .where("movie_id", id)
      .then((movie) => movie[0]);
  },
  getTheatersWhereMovieIsPlaying(id) {
    return db("theaters")
      .select("theaters.*")
      .join(
        "movies_theaters",
        "theaters.theater_id",
        "movies_theaters.theater_id"
      )
      .where("movies_theaters.movie_id", id);
  },

  getAllReviewsForMovie(id) {
    return db("reviews")
      .select("reviews.*", "critics.*")
      .join("critics", "reviews.critic_id", "critics.critic_id")
      .where("reviews.movie_id", id)
      .then((results) =>
        results.map((item) => {
          item.critic = {
            critic_id: item.critic_id,
            preferred_name: item.preferred_name,
            surname: item.surname,
            organization_name: item.organization_name,
          };
          return item;
        })
      );
  },
};

module.exports = MoviesService;
