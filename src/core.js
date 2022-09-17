const express = require("express");
const cors = require("cors");

const { connection } = require("../database/mongoose");
const { env, endpoint } = require("./config");

const { PORT } = env;

// Clase principal de nuestro servidor
class Core {
  // Metodo contructor que inicializa nuestra configuracion inicial
  constructor() {
    this.core = express();
    this.port = PORT;

    this.databaseConnection();
    this.useMiddlewares();
    this.useRoutes();
  }

  // Funcion para conectar con la BBDD
  async databaseConnection() {
    await connection();
  }

  // Funcion donde configuramos los middlewares que usara nuestra clase Core
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

  // Funcion donde declaramos las rutas de entrada de nuestra API
  useRoutes() {
    // API ROUTES
    this.core.use(endpoint.auth, require("./routes/auth.routes"));
    this.core.use(endpoint.user, require("./routes/user.routes"));
    this.core.use(endpoint.show, require("./routes/show.routes"));

    // APP ROUTE
    this.core.get("*", (req, res) =>
      res.sendFile(`${__dirname}/public/index.html`)
    );
  }

  // Funcion que arranca nuestra aplicacion backend
  start() {
    // START SERVER
    this.core.listen(this.port, () =>
      console.log(`Server ready! on http://localhost:${this.port}`)
    );
  }
}

module.exports = Core;
