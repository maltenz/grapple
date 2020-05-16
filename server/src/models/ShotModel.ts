import mongoose from 'mongoose';
import { IPost } from './PostModel';
import { User } from './UserModel';

/**
 * @description holds Shot model
 */

/**
 * Shot interface
 */
export interface IShot extends mongoose.Document {
  id: string;
  order: number;
  user: User;
  post: IPost;
  transform: () => IShot;
}

/**
 * Shot schema
 */
const schema: mongoose.SchemaDefinition = {
  id: mongoose.SchemaTypes.String,
  order: mongoose.SchemaTypes.Number,
  user: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
  post: {
    type: mongoose.SchemaTypes.String,
    ref: 'Post',
  },
};

// Shot collection name
const collectionName = 'Shot';

const ShotSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms Shot object
 * changes _id to id
 */
ShotSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates Shot model
 * @param conn database connection
 * @returns Shot model
 */
const ShotModel = (conn: mongoose.Connection): mongoose.Model<IShot> =>
  conn.model(collectionName, ShotSchema);

export default ShotModel;
