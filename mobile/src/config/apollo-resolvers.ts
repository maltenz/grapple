import updateToken from '../resolvers/updateToken';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const localResolvers = {
  Mutation: {
    updateToken,
    updatePager,
    updatePullModal,
  },
};
