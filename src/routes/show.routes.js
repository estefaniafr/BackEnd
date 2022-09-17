const express = require("express");
const {
  getShows,
  createShow,
  updateShow,
  deleteShow,
} = require("../controllers/show.controller");

const router = express.Router();

// Rutas de la entidad shows CRUD completo
router.get("/list", getShows);
router.post("/create", createShow);
router.put("/edit/:idShow", updateShow);
router.delete("/remove/:idShow", deleteShow);

module.exports = router;
