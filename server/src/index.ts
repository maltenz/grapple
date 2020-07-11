/* eslint-disable import/first */
/**
 * @description holds server main
 */

import dotenv from 'dotenv';

dotenv.config();

import apolloServer from './graphql';

apolloServer.listen(process.env.PORT || 8080).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server is running on ${url} `);
});
