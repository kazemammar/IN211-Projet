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
      type: "varchar",
      nullable: true,
    },
  },
  relations: {
    movie: {
      type: "many-to-one",
      target: "movie",
      joinColumn: {
        name: "movie_id",
      },
      inverseSide: "reviews",
    },
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: {
        name: "user_id",
      },
      inverseSide: "reviews",
    },
  },
});

module.exports = Review;
