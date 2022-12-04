const express = require("express");
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/category.controller");

const router = express.Router();

// Rutas de la entidad shows CRUD completo
router.get("/list", getCategories);
router.post("/create", createCategory);
// router.put("/edit/:idCategory", updateCategory);
router.delete("/remove/:idCategory", deleteCategory);

module.exports = router;
