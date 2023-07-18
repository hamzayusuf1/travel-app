import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      places {
        _id
        title
        description
        address
        createdAt
      }
    }
  }
`;

export const GET_POSTS = gql`
  query places {
    places {
      title
      description
      address
      location {
        lat
        lng
      }
    }
  }
`;
