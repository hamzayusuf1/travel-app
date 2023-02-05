// const { Schema, model } = require("mongoose");

// const placeSchema = new Schema({
//   title: { type: String, require: true },
//   description: { type: String, require: true },
//   image: { type: String, require: true },
//   address: { type: String, require: true },
//   location: {
//     lat: { type: Number, require: true },
//     lng: { type: Number, require: true },
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   creator: { type: String, require: true },
// });

// const Place = model("Place", placeSchema);

// module.exports = Place;

const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  image: {
    type: String,
    required: true,
  },
  places: [
    {
      type: Schema.Types.ObjectId,
      ref: "Place",
    },
  ],
});

const User = model("User", userSchema);

module.expost = User;
