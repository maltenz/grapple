import MetricsModel, { IMetrics } from '../models/MetricsModel';
import { ApolloError } from 'apollo-server';
import { Context, context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';

/**
 * creates metrics
 * @param context
 * @param args metrics
 * @returns {Metrics} created metrics
 */
export const createMetrics = async (
  { dbConn, loggedIn, user: userContext }: Context,
  args: IMetrics
): Promise<any> => {
  let createdMetrics: IMetrics;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);
    console.log('create metrics');
    console.log(args);
    createdMetrics = (await MetricsModel(dbConn).create({ ...args, user: user.id })).transform();
  } catch (error) {
    console.error('> createMetrics error: ', error);
    throw new ApolloError('Error saving post');
  }

  return createdMetrics;
};

/**
 * gets all metrics
 * @param context
 * @returns {Metrics[]} metrics list
 */
export const getAllMetrics = async ({ dbConn, loggedIn }): Promise<any> => {
  let list: IMetrics[];

  loginRequired(loggedIn);

  try {
    list = await MetricsModel(dbConn).find();
    if (list !== null && list.length > 0) {
      list = list.map((u) => {
        return u.transform();
      });
    } else {
      throw new ApolloError('No metrics found');
    }
  } catch (error) {
    console.error('> getAllMetrics error: ', error);
    throw new ApolloError('Error retrieving all metrics');
  }

  return list;
};
