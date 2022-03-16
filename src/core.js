const express = require("express");
const cors = require("cors");

const { connection } = require("../database/mongoose");
const { env, endpoint } = require("./config");

const { PORT } = env;

class Core {
  constructor() {
    this.core = express();
    this.port = PORT;

    this.databaseConnection();
    this.useMiddlewares();
    this.useRoutes();
  }

  async databaseConnection() {
    await connection();
  }

  useMiddlewares() {
    this.core.use(cors({ origin: "http://localhost:3000" }));

    this.core.use(express.static("public"));
    this.core.use(express.json());
    this.core.use(
      express.urlencoded({
        extended: false,
      })
    );
  }

  useRoutes() {
    // API ROUTES
    this.core.use(endpoint.auth, require("./routes/auth.routes"));
    this.core.use(endpoint.user, require("./routes/user.routes"));

    // APP ROUTE
    this.core.get("*", (req, res) =>
      res.sendFile(`${__dirname}/public/index.html`)
    );
  }

  start() {
    // START SERVER
    this.core.listen(this.port, () =>
      console.log(`Server ready! on http://localhost:${this.port}`)
    );
  }
}

module.exports = Core;
