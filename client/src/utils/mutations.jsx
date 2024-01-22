import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        job
        followers {
          _id
        }
        following {
          _id
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $username: String!
    $email: String!
    $password: String!
    $job: String!
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      job: $job
    ) {
      token
      user {
        _id
        username
        job
      }
    }
  }
`;

export const ADD_PLACE = gql`
  mutation addPlace($title: String!, $description: String!, $address: String!) {
    addPlace(title: $title, description: $description, address: $address) {
      title
      location {
        lat
      }
    }
  }
`;

export const ADD_THOUGHTS = gql`
  mutation addThoughts(
    $title: String!
    $description: String!
    $address: String!
  ) {
    addThoughts(title: $title, description: $description, address: $address) {
      title
      location {
        lat
      }
    }
  }
`;

export const UPDATE_PLACE = gql`
  mutation updatePlace($id: ID!, $title: String!, $description: String!) {
    updatePlace(id: $id, title: $title, description: $description) {
      title
      description
      address
    }
  }
`;

export const DELETE_PLACE = gql`
  mutation offDatabase($placeId: ID!, $creator: ID!) {
    deletePlace(placeId: $placeId, creator: $creator) {
      title
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($id: ID!) {
    addLike(id: $id) {
      title
      likes {
        _id
      }
    }
  }
`;

export const REMOVE_LIKE = gql`
  mutation removeLike($id: ID!) {
    removeLike(id: $id) {
      title
    }
  }
`;

export const ADD_FOLLOWER = gql`
  mutation addFollower($id: ID!) {
    addFollower(id: $id) {
      newFollowing {
        username
        followers {
          _id
        }
        following {
          _id
        }
      }
      newFollowers {
        username
        followers {
          _id
        }
        following {
          _id
        }
      }
    }
  }
`;
