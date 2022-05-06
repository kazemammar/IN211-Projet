const typeorm = require("typeorm");
const Review = new typeorm.EntitySchema({
  name: "Review",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    mark: {
      type: "int",
      default: 5,
    },
    comment: {
      type: "string",
      nullable: true,
    },
  },
  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      inverseSide: "reviews",
    },
    movie: {
      type: "many-to-one",
      target: "Movie",
      joinColumn: {
        name: "movie_id",
      },
      inverseSide: "reviews",
    },
  },
});

module.exports = Review;
