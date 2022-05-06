const typeorm = require("typeorm");
const Movie = new typeorm.EntitySchema({
  name: "movie",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: {
      type: "timestamptz",
      unique: false,
    },
    poster_path: {
      type: String,
      unique: false,
      nullable: true,
    },
    overview: {
      type: String,
    },
  },
  relations: {
    genres: {
      target: "genres",
      type: "many-to-many",
      joinTable: {
        joinColumn: {
          name: "movieID",
          referencedColumnName: "id",
        },
      },
      cascade: false,
    },
    user: {
      target: "User",
      type: "many-to-many",
      joinTable: {
        joinColumn: {
          name: "movieID",
          referencedColumnName: "id",
        },
      },
      cascade: false,
    },
    relations: {
      review: {
        type: "one_to_many",
        target: "Review",
        cascade: true,
        inverseSide: "movies",
      },
    },
  },
});

module.exports = Movie;
