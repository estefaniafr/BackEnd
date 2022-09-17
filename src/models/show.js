const { Schema, model } = require("mongoose");

const ShowSchema = Schema({
  title: {
    type: String,
    require: true,
  },

  subtitle: {
    type: String,
  },

  category: {
    type: String,
    required: true,
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
ShowSchema.methods.toJSON = function () {
  const { __v, ...show } = this.toObject();
  return show;
};

module.exports = model("Shows", ShowSchema);
