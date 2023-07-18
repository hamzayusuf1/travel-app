import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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
