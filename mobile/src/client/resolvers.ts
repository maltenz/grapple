import updateSignUser from '../resolvers/updateSignUser';
import addShot from '../resolvers/addShot';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    addShot,
    updatePager,
    updatePullModal,
  },
};
