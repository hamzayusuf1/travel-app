import { gql } from "@apollo/client";

export const LIKES_SUBSCRIPTION = gql`
  subscription newLike {
    newLike {
      _id
      likes {
        _id
      }
    }
  }
`;
