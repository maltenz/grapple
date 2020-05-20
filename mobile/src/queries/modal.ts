import { gql } from 'apollo-boost';

export const GET_PULL_MODAL_VIS = gql`
  query getPullModalVisibilty {
    pullModalVisible @client
  }
`;
