const { Schema, model, default: mongoose } = require("mongoose");
const { required } = require("nodemon/lib/config");

const placeSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  address: { type: String, required: true },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Place = model("Place", placeSchema);

module.exports = Place;
