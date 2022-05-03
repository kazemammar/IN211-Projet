const typeorm = require("typeorm");
const Movie = new typeorm.EntitySchema({
  name: "movie",
  columns: {
    id: {
      primary: true,
      generated: "uuid",
      type: String,
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
    },
  },
});

module.exports = Movie;
