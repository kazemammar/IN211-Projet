const express = require("express");
const { getRepository } = require("typeorm");
const Genre = require("../entities/genre");
const User = require("../entities/user");
const Movie = require("../entities/movie");
const router = express.Router();

router.get("/:genre_id/", function (req, res) {
  getRepository(Genre)
    .find({
      relations: ["user"],
      where: {
        movie: {
          id: req.params.genre_id,
        },
      },
    }) /* a modifier  */
    .then(function (genres) {
      res.json({ genres: genres });
    });
});

router.post("/new", function (req, res) {
  // console.log(req)
  const genreRepository = getRepository(Genre);
  genreRepository
    .find({
      where: {
        name: req.body.name,
      },
    })
    .then((genres) => {
      if (genres.length > 0) {
        const genre = genres[0];

        res.status(200).json({ message: "Your genre already exists " });

        // .catch(
        //   res.status(500).json({
        //     mmessage:
        //       "your genre could not be updated, there was an error on the server",
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
                      "This user does not exist, please connect to post genre",
                  });
                  return;
                }
                if (movies.length > 0) {
                  movie = movies[0];
                } else {
                  res.status(404).json({
                    message:
                      "This movie does not exist, please select a valid movie",
                  });
                  return;
                }
                const newGenre = genreRepository.create({
                  mark: req.body.mark,
                  comment: req.body.comment,
                  user: user,
                  movie: movie,
                });

                genreRepository
                  .insert(newGenre)
                  .then(function (newDocument) {
                    res.status(201).json(newDocument);
                  })
                  .catch(function (error) {
                    console.error(error);
                    if (error.code === "23505") {
                      res.status(400).json({
                        message: `You already have a genre on this movie`,
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
