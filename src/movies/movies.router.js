const express = require("express");
const router = express.Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").get(controller.getMovieById).all(methodNotAllowed);
router
  .route("/:movieId/theaters")
  .get(controller.getTheatersWhereMovieIsPlaying)
  .all(methodNotAllowed);
router
  .route("/:movieId/reviews")
  .get(controller.getAllReviewsForMovie)
  .all(methodNotAllowed);

module.exports = router;
