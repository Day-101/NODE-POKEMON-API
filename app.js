const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
const { initDb } = require("./src/db/sequelize");

const app = express();
const port = 3000;

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

sequelize.initDb();

// Future end point here
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);

app.listen(port, () =>
  console.log(`Application lauched on : http://localhost:${port}`)
);
