import { getConnection } from './database/Provider';

/**
 * @description holds context for Apollo Server
 */

export const context = async (): Promise<any> => {
  const dbConn = await getConnection();
  const context = {};
  return { dbConn, context };
};
