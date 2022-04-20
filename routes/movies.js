var express = require("express");
var router = express.Router();

const movie = require("../controller/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  movie.getMovies((data) => {
    res.send(data);
  });
});

module.exports = router;
