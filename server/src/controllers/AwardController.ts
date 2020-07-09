import { mongoose } from '@typegoose/typegoose';
import { ApolloError } from 'apollo-server';
import loginRequired from '../helper/loginRequired';
import { Context } from '../context';
import AwardModel, { Award } from '../models/AwardModel';
import { AwardInput, AwardMetrics } from '../generated/graphql';

const conditionHelper = (args: AwardInput, contextUserId?: mongoose.Types.ObjectId): Award => {
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
export const createAward = async (
  context: Context,
  args: { input: AwardInput }
): Promise<Award> => {
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
export const getAward = async (context: Context, args: { input: AwardInput }): Promise<Award> => {
  let ERR_MESSAGE;
  const { dbConn, loggedIn } = context;

  let award;
  const condition = conditionHelper(args.input);

  loginRequired(loggedIn);

  try {
    award = (await AwardModel(dbConn).findOne(condition)) as Award;

    if (award === null) {
      ERR_MESSAGE = 'No awards found';
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
export const getAwards = async (
  context: Context,
  args: { input: AwardInput }
): Promise<Award[]> => {
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
      list = list.map((item) => item);
    }

    if (list.length === 0) {
      list = [list];
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return list;
};

/**
 * @param context
 * @param {id}
 * @returns {AwardMetrics}
 */

export const getAwardMetrics = async (context: Context): Promise<AwardMetrics> => {
  let ERR_MESSAGE;
  const { dbConn, loggedIn, user } = context;
  loginRequired(loggedIn);

  let list;

  const metrics: AwardMetrics = {
    angel: { count: 0 },
    brave: { count: 0 },
    calming: { count: 0 },
    chatty: { count: 0 },
    funny: { count: 0 },
    helpful: { count: 0 },
    honest: { count: 0 },
    smart: { count: 0 },
    survivor: { count: 0 },
  };

  loginRequired(loggedIn);

  try {
    list = await AwardModel(dbConn).find({ owner: user?._id });

    if (list === null) {
      ERR_MESSAGE = 'No awards found';
    }

    if (list !== null && list.length > 0) {
      list = list.forEach(({ award }: Award): void => {
        switch (award) {
          case 'angel':
            metrics.angel.count += 1;
            break;
          case 'brave':
            metrics.brave.count += 1;
            break;
          case 'calming':
            metrics.calming.count += 1;
            break;
          case 'chatty':
            metrics.chatty.count += 1;
            break;
          case 'funny':
            metrics.funny.count += 1;
            break;
          case 'helpful':
            metrics.helpful.count += 1;
            break;
          case 'honest':
            metrics.honest.count += 1;
            break;
          case 'smart':
            metrics.smart.count += 1;
            break;
          case 'survivor':
          default:
            metrics.survivor.count += 1;
            break;
        }
      });
    }
  } catch (error) {
    throw new ApolloError(ERR_MESSAGE);
  }

  return metrics;
};
