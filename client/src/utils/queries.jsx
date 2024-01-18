import { gql } from "@apollo/client";

export const HELLO = gql`
  query Query {
    hello
  }
`;

export const GET_ME = gql`
  query user {
    user {
      _id
      email
      username
      job
      followers {
        _id
      }
      following {
        _id
      }
      places {
        _id
        title
        description
        address
        creator {
          _id
          username
        }
      }
    }
  }
`;

export const USER_PROFILE = gql`
  query profile($id: ID!) {
    profile(id: $id) {
      _id
      email
      username
      job
      followers {
        _id
      }
      following {
        _id
      }
      places {
        _id
        title
        description
        address
        creator {
          _id
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      email
    }
  }
`;

export const GET_POSTS = gql`
  query places {
    places {
      _id
      title
      description
      address
      creator {
        _id
        username
      }
      location {
        lat
        lng
      }
    }
  }
`;
