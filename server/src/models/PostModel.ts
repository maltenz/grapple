import mongoose from 'mongoose';
import { IUser } from './UserModel';

/**
 * @description holds post model
 */

/**
 * Post interface
 */
export interface IPost extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  image: string;
  user: IUser;
  transform: () => IPost;
}

/**
 * post schema
 */
const schema: mongoose.SchemaDefinition = {
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  image: { type: mongoose.SchemaTypes.String, required: true },
  user: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
};

// post collection name
const collectionName = 'post';

const postSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms post object
 * changes _id to id
 */
postSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates post model
 * @param conn database connection
 * @returns post model
 */
const PostModel = (conn: mongoose.Connection): mongoose.Model<IPost> =>
  conn.model(collectionName, postSchema);

export default PostModel;
