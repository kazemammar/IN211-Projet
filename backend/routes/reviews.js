const express = require("express");
const { getRepository } = require("typeorm");
const Review = require("../entities/review");
const User = require("../entities/user");
const Movie = require("../entities/movie");
const router = express.Router();

router.get("/", function (req, res) {
  getRepository(Review)
    .find({})
    .then(function (reviews) {
      res.json({ reviews: reviews });
    });
});

router.post("/new", function (req, res) {
  const reviewRepository = getRepository(Review);
  const users = getRepository(User).find({ id: req.body.user });
  const movies = getRepository(Movie).find({ id: req.body.movie });
  var user = null;
  var movie = null;
  if (users.length > 0) {
    user = users[0];
  } else {
    res.status(401).json({
      message: "This user does not exist, please connect to post review",
    });
    return;
  }
  if (users.length > 0) {
    movie = movies[0];
  } else {
    res.status(404).json({
      message: "This movie does not exist, please select a valid movie",
    });
    return;
  }
  const newReview = reviewRepository.create({
    mark: req.body.mark,
    comment: req.body.comment,
    user: user,
    movie: movie,
  });

  reviewRepository
    .insert(newReview)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === "23505") {
        res.status(400).json({
          message: `You already have a review on this movie`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

module.exports = router;
