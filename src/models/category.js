const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
  title: {
    type: String,
    require: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    data: Buffer,
    contentType: String,
  },
});

// Extraemos los atributos inecesarios del modelo Show antes
// de devolver la entidad a nuestra app frontend
CategorySchema.methods.toJSON = function () {
  const { __v, ...show } = this.toObject();
  return show;
};

module.exports = model("Category", CategorySchema);
