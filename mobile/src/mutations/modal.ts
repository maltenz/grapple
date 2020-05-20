import { gql } from 'apollo-boost';

export const UPDATE_PULL_MODAL_VIS = gql`
  mutation updatePullModalVisibilty($visible: Boolean!) {
    updatePullModalVisibilty(visible: $visible) @client
  }
`;

export interface PullModalVisbleType {
  visible: boolean;
}

export const PullModalMutation = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatePullModalVisibilty: (_: any, variables: PullModalVisbleType, { cache }: any): void => {
    cache.writeData({ data: { pullModalVisible: variables.visible } });
  },
};
