/**
 * @description holds server main
 */

import dotenv from 'dotenv';

import apolloServer from './graphql';

dotenv.config();

const port: string = process.env.PORT as string;

apolloServer.listen(port || 8080).then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`Apollo Server is running on ${url} `);
});
