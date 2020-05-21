import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const localResolvers = {
  Mutation: {
    updatePager,
    updatePullModal,
  },
};
