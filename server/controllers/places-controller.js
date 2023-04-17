const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const Place = require("../models/Place");
const User = require("../models/User");

const convertAdressToCoordinates = require("../utils/address");
const { find, create } = require("../models/Place");

module.exports = {
  async getPlaces(req, res) {
    await Place.find()
      .then((places) => res.json(places))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  async getPlaceById(req, res) {
    try {
      const placeId = req.params.id;

      const place = await Place.findOne({ _id: placeId }).then((place) =>
        !place
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(place)
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getPlaceByUserId(req, res) {
    const userId = req.params.uid;
    try {
      const Places = await Place.find({ creator: userId });
      console.log({ user: userId });
      if (!Places || Places.length === 0) {
        return res
          .status(404)
          .json({ message: "Could not find places for this user" });
      }
      res.json({ Places });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async createPlace(req, res) {
    const { address, creator } = req.body;
    let coordinates;
    let user;

    try {
      coordinates = await convertAdressToCoordinates(address);
    } catch (error) {}

    console.log(coordinates);

    Place.create({ ...req.body, location: coordinates })
      .then((place) => {
        user1 = User.findOneAndUpdate(
          { _id: req.body.creator },
          { $addToSet: { places: place.creator } },
          { new: true }
        );

        console.log(user1);
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Place created, but found no user with that ID",
              place: { user },
            })
          : res.json("Created the place 🎉")
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  async updatePlace(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      throw new Error("Invalid inputs passed, please check your information");
    }

    const placeId = req.params.id;

    Place.findOneAndUpdate(
      { _id: placeId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((updatedPlace) => {
        console.log(updatedPlace);
        !updatedPlace
          ? res.status(404).json({ error: "No place with that ID" })
          : res.status(200).json({ place: updatedPlace });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  async deletePlace(req, res) {
    const placeId = req.params.id;
    try {
      await Place.findOneAndDelete({ _id: placeId });
    } catch (error) {
      console.log(error);
      res.status(404).json("No place with that id exists");
    }

    res.status(200).json({ message: "Place deleted" });
  },
};
