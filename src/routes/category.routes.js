const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

// Rutas de la entidad categoría CRUD completo
router.get("/list", getCategories);
router.post("/create", createCategory);
router.put("/edit", updateCategory);
router.delete("/remove/:idCategory", deleteCategory);

module.exports = router;
