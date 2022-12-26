const { request, response } = require("express");

const Category = require("../models/category");

const getCategories = async (req = request, res = response) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
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

const updateCategory = async (req = request, res = response) => {
  const { id, ...rest } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const category = await Category.findByIdAndUpdate(id, rest, { new: true });
    res.status(200).send(category);
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
  updateCategory,
  deleteCategory,
};
