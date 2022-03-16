const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },

  lastname: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  registerDate: {
    type: Date,
    required: true,
  },

  status: {
    type: String,
    default: "INACTIVE",
    enum: ["ACTIVE", "INACTIVE"],
  },

  role: {
    type: String,
    default: "USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },

  lastSession: { type: Date },
  birthday: { type: Date },
  locale: { type: String },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
