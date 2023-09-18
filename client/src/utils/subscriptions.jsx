import { gql } from "@apollo/client";

export const LIKES_SUBSCRIPTION = gql`
  subscription NewLike {
    newLike {
      _id
      likes {
        _id
      }
    }
  }
`;
