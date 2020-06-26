import loginRequired from '../helper/loginRequired';
import { ApolloError } from 'apollo-server';
import { mongoose } from '@typegoose/typegoose';
import { Context } from '../context';
import AwardModel, { Award, AwardType } from '../models/AwardModel';
import { User } from '../models/UserModel';
import { Post } from '../models/PostModel';

export interface AwardArgs {
  id?: mongoose.Types.ObjectId;
  award: AwardType;
  nominate: boolean;
  post: Post;
  user: User;
}

const awardConditionHelper = (args: AwardArgs, contextUserId?: mongoose.Types.ObjectId): Award => {
  const { id, award, nominate, post, user } = args;
  const condition = {};

  if (id) {
    Object.assign(condition, { id });
  }

  if (award) {
    Object.assign(condition, { award });
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
 * @returns {Award}
 */
export const createAward = async (context: Context, args: { input: AwardArgs }): Promise<Award> => {
  const { dbConn, loggedIn, user } = context;
  let ERR_MESSAGE;
  loginRequired(loggedIn);

  let award;
  const condition = awardConditionHelper(args.input, user?._id);

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

  let list;
  const condition = awardConditionHelper(args.input);

  loginRequired(loggedIn);

  try {
    list = (await AwardModel(dbConn).find(condition)) as Award | Award[];

    if (list === null) {
      ERR_MESSAGE = 'No award found';
    }

    if (list !== null && list.length > 0) {
      list = list.map((award) => award);
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return list;
};
