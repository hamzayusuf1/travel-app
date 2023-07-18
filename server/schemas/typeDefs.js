const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    image: String
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
    user(username: String!): User
    places: [Place]
    place(placeId: ID!): Place
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlace(title: String!, description: String!, address: String!): Place
    deletePlace(placeId: String!, creator: String!): Place
  }
`;

//Check mutation for locaton maybe needs to be input :locationInput

module.exports = typeDefs;
