import MetricModel, { IMetric } from '../models/MetricModel';
import { ApolloError } from 'apollo-server';
import { Context } from '../context';
import loginRequired from '../helper/loginRequired';
import getUserContext from '../helper/getUserContext';

/**
 * creates metric
 * @param context
 * @param args metric
 * @returns {Metric} created metric
 */
export const createMetric = async (
  { dbConn, loggedIn, user: userContext }: Context,
  args: IMetric
): Promise<any> => {
  let createdMetric: IMetric;

  loginRequired(loggedIn);

  try {
    const user = await getUserContext(dbConn, userContext);
    createdMetric = (await MetricModel(dbConn).create({ ...args, user: user.id })).transform();
  } catch (error) {
    console.error('> createMetric error: ', error);
    throw new ApolloError('Error saving post');
  }

  return createdMetric;
};

/**
 * gets all metric
 * @param context
 * @returns {Metric[]} metric list
 */
export const getAllMetrics = async ({ dbConn, loggedIn }): Promise<any> => {
  let list: IMetric[];

  loginRequired(loggedIn);

  try {
    list = await MetricModel(dbConn).find();
    if (list !== null && list.length > 0) {
      list = list.map((u) => {
        return u.transform();
      });
    } else {
      throw new ApolloError('No metric found');
    }
  } catch (error) {
    console.error('> getAllMetrics error: ', error);
    throw new ApolloError('Error retrieving all metric');
  }

  return list;
};

/**
 * gets metric by id
 * @param context
 * @param id metric id
 * @returns {Metric | null} metric or null
 */
export const getMetric = async ({ dbConn, loggedIn }, id: string): Promise<any> => {
  let metric: IMetric | null;

  loginRequired(loggedIn);

  try {
    metric = await MetricModel(dbConn).findById(id);
    if (metric !== null) {
      metric = metric.transform();
    }
  } catch (error) {
    console.error('> getMetric error: ', error);
    throw new ApolloError('Error retrieving metric with id: ' + id);
  }

  return metric;
};
