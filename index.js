const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");

const app = express();
app.use(express.json())

const sequelize = new Sequelize("sqlite::memory:");

class User extends Model {}

User.init(
  {
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
  },
  { sequelize, modelName: "user" }
);

app.get("/:name", async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  res.send(user);
});

app.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// User.create({
//   username: "janedoe",
//   birthday: new Date(1980, 6, 20)
// });

sequelize.sync().then(() => {
  app.listen(4000, () => console.log("executasndo"));
});
