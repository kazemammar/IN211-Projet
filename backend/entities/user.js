const typeorm = require("typeorm");
const User = new typeorm.EntitySchema({
  name: "User",
  columns: {
    id: {
      primary: true,
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
  },
});

module.exports = User;
