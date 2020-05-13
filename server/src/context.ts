import { getConnection } from './database/Provider';
import authenticate from './helper/authenticate';

/**
 * @description holds context for Apollo Server
 */

export const context = async (req): Promise<any> => {
  const dbConn = await getConnection();
  const loggedIn = await authenticate(dbConn, req);

  return {
    dbConn,
    loggedIn,
    token: '',
  };
};
