/**
 * @description holds server main
 */

import dotenv from 'dotenv';
dotenv.config();

import apolloServer from './graphql';

const port: string = process.env.PORT as string;

apolloServer.listen(port || 8080).then(({ url }) => {
  console.log(`Apollo Server is running on ${url} `);
});
