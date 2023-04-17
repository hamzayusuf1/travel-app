const Place = require("../models/Place");
const User = require("../models/User");
const { signToken } = require("../utils/auth");
const convertAdressToCoordinates = require("../utils/address");

const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      await User.find().populate("places");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("places");
    },
    place: async (parent, { placeId }) => {
      return Place.findOne({ _id: placeId });
    },
    places: async () => {
      return Place.find();
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    addPlace: async (_, { title, description, address, image, creator }) => {
      let coordinates;
      try {
        coordinates = await convertAdressToCoordinates(address);
      } catch (error) {}

      console.log(coordinates);

      const place = await Place.create({
        title,
        description,
        address,
        creator,
        location: coordinates,
      });

      await User.findOneAndUpdate(
        { _id: creator },
        { $addToSet: { places: place._id } },
        {
          new: true,
          runValidators: true,
        }
      );

      return place;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email has been found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },

    deletePlace: async (parent, { placeId, creator }) => {
      const removedPlace = await Place.findOneAndDelete({ _id: placeId });

      await User.findByIdAndUpdate(
        { _id: creator },
        { $pull: { places: placeId } },
        { new: true }
      );

      return removedPlace;
    },
  },
};

module.exports = resolvers;
