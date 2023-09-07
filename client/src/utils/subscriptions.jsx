import { gql } from "@apollo/client";

export const LIKES_SUBSCRIPTION = gql`
  subscription likesAdded {
    likesAdded {
      _id
      likes {
        _id
      }
    }
  }
`;
