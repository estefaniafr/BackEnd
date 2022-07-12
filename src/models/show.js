const { Schema, model } = require("mongoose");

const ShowSchema = Schema({

  title: {
    type: String,
    require: true,
  },

  subtitle: {
    type: String,
    required: true,
    unique: true,
  },

  catergory: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  picture: { type: Image },
  
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...show } = this.toObject();
  return show;
};

module.exports = model("Shows", ShowSchema);
