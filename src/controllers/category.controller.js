const { request, response } = require("express");

const Category = require("../models/category");

const getCategories = async (req = request, res = response) => {
  try {
    const categories = await Category.find();

    if (categories.length === 0) {
      return res.status(400).json({ msg: "No shows" });
    }

    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ error: "internal.error" });
  }
};

const createCategory = async (req = request, res = response) => {
  const category = new Category(req.body);

  try {
    await category.save();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal.error" });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { idCategory } = req.params;

  if (!idCategory) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    await Category.findByIdAndRemove(idCategory);
    res.status(200).json({ msg: "Category has been removed" });
  } catch (error) {
    res.status(500).send({ error: "internal.error" });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};