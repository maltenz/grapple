import mongoose from 'mongoose';
import { IUser } from './UserModel';

/**
 * @description holds like model
 */

/**
 * User interface
 */
export interface ILike extends mongoose.Document {
  id: string;
  user: IUser;
  transform: () => ILike;
}

/**
 * like schema
 */
const schema: mongoose.SchemaDefinition = {
  like: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
};

// like collection name
const collectionName = 'like';

const likeSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms like object
 * changes _id to id
 */
likeSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates like model
 * @param conn database connection
 * @returns like model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<ILike> =>
  conn.model(collectionName, likeSchema);

export default UserModel;