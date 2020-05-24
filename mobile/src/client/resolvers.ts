import updateSignUser from '../resolvers/updateSignUser';
import updateShot from '../resolvers/updateShot';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    updateShot,
    updatePager,
    updatePullModal,
  },
};
