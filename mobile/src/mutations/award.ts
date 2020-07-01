import { gql } from 'apollo-boost';

export const CREATE_AWARD = gql`
  mutation createAward(
    $post: ID
    $award: AwardsEnum
    $nominate: Boolean
    $owner: ID
    $subscriber: ID
  ) {
    createAward(
      input: {
        post: $post
        award: $award
        nominate: $nominate
        owner: $owner
        subscriber: $subscriber
      }
    ) {
      award
    }
  }
`;
