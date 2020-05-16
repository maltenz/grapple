import mongoose from 'mongoose';
import { IPost } from './PostModel';
import { User } from './UserModel';

/**
 * @description holds share model
 */

/**
 * User interface
 */
export interface IShare extends mongoose.Document {
  id: string;
  user: User;
  post: IPost;
  transform: () => IShare;
}

/**
 * share schema
 */
const schema: mongoose.SchemaDefinition = {
  id: mongoose.SchemaTypes.String,
  user: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
  post: {
    type: mongoose.SchemaTypes.String,
    ref: 'Post',
  },
};

// share collection name
const collectionName = 'share';

const shareSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms share object
 * changes _id to id
 */
shareSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates share model
 * @param conn database connection
 * @returns share model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<IShare> =>
  conn.model(collectionName, shareSchema);

export default UserModel;
