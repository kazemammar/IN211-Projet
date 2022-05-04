const typeorm = require("typeorm");
const Genres = new typeorm.EntitySchema({
  name: "genres",
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    name: {
      type: String,
      unique: true,
    },
  },
});

module.exports = Genres;
