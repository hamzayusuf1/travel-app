const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type File {
    id: ID!
    filename: String!
    mimetype: String!
    path: String!
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    image: String
    job: String
    followers: [User]
    following: [User]
    places: [Place]!
  }

  type Place {
    _id: ID
    title: String
    description: String
    image: String
    address: String
    location: Location
    createdAt: String
    likes: [User]!
    creator: User
  }

  input locationInput {
    lat: Float
    lng: Float
  }

  type Location {
    _id: ID
    lat: Float
    lng: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type twoUsers {
    newFollowers: User
    newFollowing: User
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Query {
    users: [User]
    user: User
    places: [Place]
    place(placeId: ID!): Place
    hello: String
    profile(id: ID!): User
  }

  type Mutation {
    uploadFile(file: Upload!): File!
    addUser(
      username: String!
      email: String!
      password: String!
      job: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addPlace(title: String!, description: String!, address: String!): Place
    addThoughts(title: String!, description: String!, address: String!): Place
    updatePlace(id: ID!, title: String!, description: String!): Place
    deletePlace(placeId: ID!, creator: ID!): Place
    addLike(id: ID!): Place
    removeLike(id: ID!): Place
    addFollower(id: ID!): twoUsers
    removeFollower(id: ID!): User
    singleUpload(file: Upload!): File!
  }

  type Subscription {
    newLike: Place
  }
`;

//Check mutation for locaton maybe needs to be input :locationInput

module.exports = typeDefs;
