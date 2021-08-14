const TheatersService = require("./theaters.service");

async function getTheatersAndMoviesPlaying(req, res, next) {
  const result = await TheatersService.getTheatersAndMoviesShowing();
  return res.json({ data: result });
}

module.exports = {
  getTheatersAndMoviesPlaying,
};
