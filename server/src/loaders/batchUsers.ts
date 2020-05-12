import UserModel from '../models/UserModel';

const batchUsers = async ({ dbConn }, userIds) => {
  console.log('keys====', userIds);
  const users = await UserModel(dbConn).find({ _id: { $in: userIds } });
  return userIds.map((userId) => users.find((user) => user.id === userId));
};

export { batchUsers };
