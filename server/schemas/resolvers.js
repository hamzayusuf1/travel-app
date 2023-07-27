const Place = require("../models/Place");
const User = require("../models/User");
const { signToken } = require("../utils/auth");
const convertAdressToCoordinates = require("../utils/address");

const { ApolloError, AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      console.log(context.user);
      return await User.find();

      // throw new AuthenticationError("Please login");
    },
    user: async (parent, { username }, context) => {
      User.findOne({ username }).populate("places");
      console.log(context.user);
      // throw new AuthenticationError("Please login");
    },
    place: async (parent, { placeId }) => {
      return Place.findOne({ _id: placeId });
    },
    places: async () => {
      return Place.find().sort({ createdAt: -1 });
    },
  },

  Mutation: {
    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({
        username,
        email,
        password,
        followers: 0,
        following: 0,
        likes: 0,
      });
      const token = signToken({ id: user._id, email: user.email });

      console.log(token);

      return { token, user };
    },

    addPlace: async (_, { title, description, address, image }, context) => {
      console.log("hits");
      console.log(context.user);

      let coordinates;
      try {
        coordinates = await convertAdressToCoordinates(address);
      } catch (error) {}

      coordinates = await convertAdressToCoordinates(address);
      console.log(coordinates);

      // const place = await Place.create({
      //   title,
      //   description,
      //   address,

      //   location: coordinates,
      //   likes: 0,
      // });

      // await User.findOneAndUpdate(
      //   { _id: creator },
      //   { $addToSet: { places: place._id } },
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // );

      // return place;
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApolloError("No user with this email has been found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new ApolloError("incorrect password");
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
