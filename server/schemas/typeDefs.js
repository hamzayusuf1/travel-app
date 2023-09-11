const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    image: String
    followers: Int!
    following: Int!
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

  type Query {
    users: [User]
    user: User
    places: [Place]
    place(placeId: ID!): Place
    hello: String
    profile(id: ID!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlace(title: String!, description: String!, address: String!): Place
    updatePlace(id: ID!, title: String!, description: String!): Place
    deletePlace(placeId: ID!, creator: ID!): Place
    addLike(id: ID!): Place
    removeLike(id: ID!): Place
  }

  type Subscription {
    newLike: Place
  }
`;

//Check mutation for locaton maybe needs to be input :locationInput

module.exports = typeDefs;
