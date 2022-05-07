const express = require("express");
const { getRepository } = require("typeorm");
const Review = require("../entities/review");
const User = require("../entities/user");
const Movie = require("../entities/movie");
const router = express.Router();

router.get("/:user_id/", function (req, res) {
  getRepository(Review)
    .find({ relations: ["user"], user_id: req.params.user_id })
    .then(function (reviews) {
      res.json({ reviews: reviews });
    });
});

router.post("/new", function (req, res) {
  const reviewRepository = getRepository(Review);
  reviewRepository
    .find({
      relations: ["user", "movie"],
      user_id: req.body.user,
      movie_id: req.body.movie,
    })
    .then((reviews) => {
      if (reviews.length > 0) {
        const review = reviews[0];
        review.mark = req.body.mark;
        review.comment = req.body.comment;
        reviewRepository
          .save(review)
          .then(
            res.status(200).json({ message: "review updated successfully" })
          );
        // .catch(
        //   res.status(500).json({
        //     mmessage:
        //       "your review could not be updated, there was an error on the server",
        //   })
        // );
        return;
      } else {
        getRepository(User)
          .find({ id: req.body.user })
          .then((users) => {
            getRepository(Movie)
              .find({ id: req.body.movie })
              .then((movies) => {
                var user = null;
                var movie = null;
                if (users.length > 0) {
                  user = users[0];
                } else {
                  res.status(401).json({
                    message:
                      "This user does not exist, please connect to post review",
                  });
                  return;
                }
                if (users.length > 0) {
                  movie = movies[0];
                } else {
                  res.status(404).json({
                    message:
                      "This movie does not exist, please select a valid movie",
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
                      res
                        .status(500)
                        .json({ message: "Error while creating the user" });
                    }
                  });
              });
          });
      }
    });
});

module.exports = router;
