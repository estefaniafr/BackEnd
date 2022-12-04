const express = require("express");
const {
  getShows,
  getShowsByIdCategory,
  createShow,
  updateShow,
  deleteShow,
} = require("../controllers/show.controller");

const router = express.Router();

// Rutas de la entidad shows CRUD completo
router.get("/list", getShows);
router.get("/list/:idCategory", getShowsByIdCategory);
router.post("/create", createShow);
router.put("/edit/:idShow", updateShow);
router.delete("/remove/:idShow", deleteShow);

module.exports = router;
