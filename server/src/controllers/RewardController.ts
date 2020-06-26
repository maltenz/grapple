import loginRequired from '../helper/loginRequired';
import { mongoose } from '@typegoose/typegoose';
import { Context } from '../context';
import RewardModel, { Reward, RewardType } from '../models/RewardModel';
import { ApolloError } from 'apollo-server';
import { User } from '../models/UserModel';
import { Post } from '../models/PostModel';

export interface RewardArgs {
  id?: mongoose.Types.ObjectId;
  reward: RewardType;
  nominate: boolean;
  post: Post;
  user: User;
}

const rewardConditionHelper = (
  args: RewardArgs,
  contextUserId?: mongoose.Types.ObjectId
): Reward => {
  const { id, reward, nominate, post, user } = args;
  const condition = {};

  if (id) {
    Object.assign(condition, { id });
  }

  if (reward) {
    Object.assign(condition, { reward });
  }

  if (nominate) {
    Object.assign(condition, { nominate });
  }

  if (post) {
    Object.assign(condition, { post });
  }

  if (user) {
    Object.assign(condition, { user });
  }

  if (contextUserId) {
    Object.assign(condition, { user: contextUserId });
  }

  return condition;
};

/**
 * @param context
 * @returns {Reward}
 */
export const createReward = async (
  context: Context,
  args: { input: RewardArgs }
): Promise<Reward> => {
  const { dbConn, loggedIn, user } = context;
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let reward;
  const condition = rewardConditionHelper(args.input, user?._id);

  try {
    const hasReward = await RewardModel(dbConn).findOne(condition);

    if (hasReward) {
      reward = RewardModel(dbConn).findOneAndDelete(condition);
      throw new Error(ERR_MESSAGE);
    }

    reward = (await RewardModel(dbConn).create(condition)) as Reward;

    if (reward === null) {
      ERR_MESSAGE = 'Unable to create reward';
      throw new Error(ERR_MESSAGE);
    }

    return reward;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param {id}
 * @returns {Reward}
 */
export const getReward = async (context: Context, args: { input: RewardArgs }): Promise<Reward> => {
  let ERR_MESSAGE;
  const { dbConn, loggedIn } = context;

  let list;
  const condition = rewardConditionHelper(args.input);

  loginRequired(loggedIn);

  try {
    list = (await RewardModel(dbConn).find(condition)) as Reward | Reward[];

    if (list === null) {
      ERR_MESSAGE = 'No reward found';
    }

    if (list !== null && list.length > 0) {
      list = list.map((reward) => reward);
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return list;
};
