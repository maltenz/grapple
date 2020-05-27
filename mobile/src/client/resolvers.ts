import updateSignUser from '../resolvers/updateSignUser';
import { getShot, addShot, deleteShot, updateShot } from '../resolvers/shots';
import updatePager from '../resolvers/updatePager';
import updatePullModal from '../resolvers/updatePullModal';

export const resolvers = {
  Query: {
    getShot,
  },
  Mutation: {
    updateSignUser,
    addShot,
    deleteShot,
    updateShot,
    updatePager,
    updatePullModal,
  },
};
