const { Schema, model, default: mongoose } = require("mongoose");

const placeSchema = new Schema({
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
  creator: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Place = model("Place", placeSchema);

module.exports = Place;
