/* eslint-disable */
import { gql } from 'apollo-boost';

export const UPDATE_PULL_MODAL_VIS = gql`
  mutation updatePullModalVisibilty($visible: Boolean!) {
    updatePullModalVisibilty(visible: $visible) @client
  }
`;

 export const PullModalMutation = {
  // @ts-ignore
  updatePullModalVisibilty: (_, variables, { cache }) => {
    cache.writeData({ data: { pullModalVisible: variables.visible } });
    return null;
  },
};

/* eslint-enable */
