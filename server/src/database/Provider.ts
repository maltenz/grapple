import mongoose from 'mongoose';

const uri: string = process.env.MONGO_PATH as string;
let conn: mongoose.Connection | null = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if (conn === null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  }
  return conn;
};
