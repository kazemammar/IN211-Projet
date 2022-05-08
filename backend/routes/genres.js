const express = require("express");
const { getRepository } = require("typeorm");
const Genre = require("../entities/genres");
const User = require("../entities/user");
const Movie = require("../entities/movie");
const router = express.Router();

router.get("/", function (req, res) {
  getRepository(Genre)
    .find({})
    .then(function (genres) {
      res.json({ genres: genres });
    });
});

router.post("/new", function (req, res) {
  // console.log(req)

  const genreRepository = getRepository(Genre);
  const newGenre = genreRepository.create({
    name: req.body.name,
  });
  genreRepository
    .insert(newGenre)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === 23505) {
        res.status(200).json({ message: "Your genre already exists " });
      } else {
        res.status(500).json({
          message: `There was an error on the server`,
        });
      }
    });
});
router.delete("/delete/:genre_id/", function (req, res) {
  getRepository(Genre)
    .delete({ id: req.params.genre_id })
    .then(function () {
      res.status(200).json({ message: "Genre successfully deleted" });
    })
    .catch(function () {
      res.status(500).json({ message: "Error while deleting the genre" });
    });
});
module.exports = router;
