import { gql } from 'apollo-boost';

export const AWARD = gql`
  query award($award: AwardsEnum, $nominate: Boolean, $owner: ID) {
    award(input: { award: $award, nominate: $nominate, owner: $owner }) {
      award
    }
  }
`;

export const AWARDS = gql`
  query awards($award: AwardsEnum, $nominate: Boolean, $owner: ID) {
    awards(input: { award: $award, nominate: $nominate, owner: $owner }) {
      award
    }
  }
`;
