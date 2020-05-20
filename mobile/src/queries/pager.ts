import { gql } from 'apollo-boost';

export const GET_PAGER_VALUE = gql`
  query getPagerValue {
    pager @client {
      activeIndex
      count
      visible
    }
  }
`;
