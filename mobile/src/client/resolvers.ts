import updateSignUser from '../resolvers/updateSignUser';
import { addShot, deleteShot, updateShot } from '../resolvers/shots';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Mutation: {
    updateSignUser,
    addShot,
    deleteShot,
    updateShot,
    updatePager,
    updatePullModal,
  },
};
