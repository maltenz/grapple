import loginRequired from '../helper/loginRequired';
import { mongoose } from '@typegoose/typegoose';
import { Context } from '../context';
import AwardModel, { Award, AwardType } from '../models/AwardModel';
import { ApolloError } from 'apollo-server';
import { User } from '../models/UserModel';
import { Post } from '../models/PostModel';

export interface AwardArgs {
  id?: mongoose.Types.ObjectId;
  award: AwardType;
  nominate: boolean;
  post: Post;
  owner: User;
  subscriber: User;
}

const conditionHelper = (args: AwardArgs, contextUserId?: mongoose.Types.ObjectId): Award => {
  const { id, award, nominate = false, post, owner, subscriber } = args;
  const condition = {};

  Object.assign(condition, { nominate });

  if (id) {
    Object.assign(condition, { id });
  }

  if (award) {
    Object.assign(condition, { award });
  }

  if (post) {
    Object.assign(condition, { post });
  }

  if (owner) {
    Object.assign(condition, { owner });
  }

  if (subscriber) {
    Object.assign(condition, { subscriber });
  }

  if (contextUserId) {
    Object.assign(condition, { user: contextUserId });
  }

  return condition;
};

/**
 * @param context
 * @returns {Award}
 */
export const createAward = async (context: Context, args: { input: AwardArgs }): Promise<Award> => {
  const { dbConn, loggedIn, user } = context;
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let award;
  const condition = conditionHelper(args.input, user?._id);

  try {
    const hasAward = await AwardModel(dbConn).findOne(condition);

    if (hasAward) {
      award = AwardModel(dbConn).findOneAndDelete(condition);
      throw new Error(ERR_MESSAGE);
    }

    award = (await AwardModel(dbConn).create(condition)) as Award;

    if (award === null) {
      ERR_MESSAGE = 'Unable to create award';
      throw new Error(ERR_MESSAGE);
    }

    return award;
  } catch (error) {
    throw new ApolloError(error);
  }
};

/**
 * @param context
 * @param {id}
 * @returns {Award}
 */
export const getAward = async (context: Context, args: { input: AwardArgs }): Promise<Award> => {
  let ERR_MESSAGE;
  const { dbConn, loggedIn } = context;

  let award;
  const condition = conditionHelper(args.input);

  loginRequired(loggedIn);

  try {
    award = (await AwardModel(dbConn).findOne(condition)) as Award;

    if (award === null) {
      ERR_MESSAGE = 'No award found';
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return award;
};

/**
 * @param context
 * @param {id}
 * @returns {Award}
 */
export const getAwards = async (context: Context, args: { input: AwardArgs }): Promise<Award[]> => {
  let ERR_MESSAGE;
  const { dbConn, loggedIn } = context;

  let list;
  const condition = conditionHelper(args.input);

  loginRequired(loggedIn);

  try {
    list = await AwardModel(dbConn).find(condition);

    if (list === null) {
      ERR_MESSAGE = 'No award found';
    }

    if (list !== null && list.length > 0) {
      list = list.map((list) => list);
    }

    if (list.length === 0) {
      list = [list];
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return list;
};
