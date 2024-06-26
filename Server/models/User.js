const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    profilePicture: {
      type: String,
      default: "/assets/noAvatar.png",
    },
    coverPicture: {
      type: String,
      default: "/assets/noCover.jpg",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      max: 50,
    },
    city: String,
    relationship: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
