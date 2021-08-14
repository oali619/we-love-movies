const express = require("express");
const router = express.Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.getTheatersAndMoviesPlaying)
  .all(methodNotAllowed);

module.exports = router;
