const Place = require("../models/Place");
const User = require("../models/User");
const { signToken } = require("../utils/auth");
const convertAdressToCoordinates = require("../utils/address");
const uploadToAws = require("../utils/uploadS3");
const { PubSub, withFilter } = require("graphql-subscriptions");
const pubsub = new PubSub();
require("dotenv").config();

const { ApolloError, AuthenticationError } = require("apollo-server-express");
const { Context } = require("express-validator/src/context");

const { GraphQLUpload } = require("graphql-upload-minimal");

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    hello: () => {
      return "hello";
    },
    users: async (parent, args, context) => {
      if (context.user) {
        const users = await User.find().populate("places");
        return users;
      }

      throw new AuthenticationError("Please login");
    },

    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ email: context.user.email }).populate(
          "places"
        );

        return user;
      }
      throw new AuthenticationError("Please login");
    },

    profile: async (_, args, context) => {
      console.log(args);
      const user = await User.findOne({ _id: args.id }).populate({
        path: "places",
        options: { sort: { createdAt: -1 } },
      });

      if (user) {
        return user;
      }

      throw new Error("User does not exist");
    },

    place: async (parent, { placeId }) => {
      return Place.findOne({ _id: placeId });
    },
    places: async () => {
      const allPlaces = await Place.find()
        .sort({ createdAt: -1 })
        .populate("creator");

      return allPlaces;
    },
  },

  Mutation: {
    singleUpload: async (parent, { file }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await finished(out);

      return { filename, mimetype, encoding };
    },

    addUser: async (parent, { email, username, password }) => {
      const user = await User.create({
        username,
        email,
        password,
      });
      const token = signToken({ _id: user._id, email: user.email });

      return { token, user };
    },

    // Adding post on above the fold
    addThoughts: async (_, { title, address, description, image }, context) => {
      console.log("hits");
      console.log(title);
      console.log(image);
      // let coordinates;
      // try {
      //   coordinates = await convertAdressToCoordinates(address);
      // } catch (error) {}

      // coordinates = await convertAdressToCoordinates(address);

      // const place = await Place.create({
      //   title,
      //   description,
      //   address,
      //   location: coordinates,
      //   likes: [],
      //   // creator: context.user._id,
      // });

      // await User.findOneAndUpdate(
      //   { _id: context.user._id },
      //   { $addToSet: { places: place._id } },
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // );

      return place;
    },

    addPlace: async (_, { title, description, address }, context) => {
      console.log(context.user);
      if (context.user) {
        let coordinates;
        try {
          coordinates = await convertAdressToCoordinates(address);
        } catch (error) {}

        coordinates = await convertAdressToCoordinates(address);

        const place = await Place.create({
          title,
          description,
          address,
          location: coordinates,
          likes: [],
          creator: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { places: place._id } },
          {
            new: true,
            runValidators: true,
          }
        );

        return place;
      }
      throw new AuthenticationError("You need to be logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new ApolloError("No user with this email has been found");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new ApolloError("Incorrect password");
      }

      const token = signToken(user);

      return { token, user };
    },

    deletePlace: async (parent, { placeId, creator }) => {
      console.log(placeId);
      const removedPlace = await Place.findOneAndDelete({ _id: placeId });

      await User.findByIdAndUpdate(
        { _id: creator },
        { $pull: { places: placeId } },
        { new: true }
      );

      return removedPlace;
    },
    updatePlace: async (_, args, context) => {
      try {
        const updatedPlace = await Place.findOneAndUpdate(
          { _id: args.id },
          {
            $set: { title: args.title, description: args.description },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedPlace;
      } catch (error) {
        console.log(error);
      }
    },

    addLike: async (_, args, context) => {
      try {
        const newLikes = await Place.findOneAndUpdate(
          { _id: args.id },
          {
            // $set: { likes: likes + 1 },
            $addToSet: { likes: context.user._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        pubsub.publish("NEW_LIKE", { updatedLikes: newLikes });
        console.log(newLikes);
        return newLikes;
      } catch (error) {
        console.log(error);
      }
    },

    removeLike: async (_, { id }, context) => {
      try {
        const removedLike = await Place.findOneAndUpdate(
          { _id: id },
          {
            // $set: { likes: likes + 1 },
            $pull: { likes: context.user._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return removedLike;
      } catch (error) {}
    },
    addFollower: async (_, args, context) => {
      console.log("hits");
      console.log(args);
      console.log(context.user);
      try {
        const newFollowing = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { following: args.id },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        const newFollowers = await User.findOneAndUpdate(
          { _id: args.id },
          {
            // $set: { likes: likes + 1 },
            $addToSet: { followers: context.user._id },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return { newFollowing, newFollowers };
      } catch (error) {
        console.log(error);
      }
    },

    removeFollower: async (_, args, context) => {
      try {
        const removedFollower = await User.findOneAndUpdate(
          { _id: args.id },
          {
            // $set: { likes: likes + 1 },
            $pull: { followers: "6507fc00788e3ed1795c64a1" },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return removedFollower;
      } catch (error) {}
    },
  },
  Subscription: {
    newLike: {
      subscribe: () => {
        return pubsub.asyncIterator(["NEW_LIKE"]);
      },
    },
  },
};

module.exports = resolvers;
