const express = require("express");
const { getRepository } = require("typeorm");
const Movie = require("../entities/movie");
const router = express.Router();

router.get("/", function (req, res) {
  console.log("I asked for movies");
  getRepository(Movie)
    .find({})
    .then(function (movies) {
      res.status(200).json({
        message: "the endpoint works, here are the movies",
        data: { movies: movies },
      });
    });
});

router.post("/new", function (req, res) {
  console.log("create movie", req.body);
  const movieRepository = getRepository(Movie);
  const newMovie = movieRepository.create({
    title: req.body.title,
    release_date: req.body.release_date,
  });
  movieRepository
    .insert(newMovie)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === "23505") {
        res.status(400).json({
          message: `User with email "${newMovie.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the movie" });
      }
    });
});

router.delete("/:movieId", function (req, res) {
  getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(200).json({ message: "User successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the user" });
    });
});

module.exports = router;
