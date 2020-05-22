import updateSignUser from '../resolvers/updateSignUser';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    updatePager,
    updatePullModal,
  },
};
