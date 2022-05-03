const typeorm = require("typeorm");
const Genres = new typeorm.EntitySchema({
  name: "genres",
  columns: {
    id: {
      primary: true,
      type: String,
    },
    name: {
      type: String,
      unique: true,
    },
  },
});

module.exports = Genres;
