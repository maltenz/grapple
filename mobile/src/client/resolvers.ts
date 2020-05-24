import updateSignUser from '../resolvers/updateSignUser';
import updateSignShot from '../resolvers/updateSignShot';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    updateSignShot,
    updatePager,
    updatePullModal,
  },
};
