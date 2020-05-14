import mongoose from 'mongoose';
import { IUser } from './UserModel';
import { IPost } from './PostModel';

/**
 * @description holds metrics model
 */

/**
 * Metrics interface
 */
export interface IMetrics extends mongoose.Document {
  id: string;
  post: IPost;
  user: IUser;
  likes: [IUser];
  comments: [IUser];
  shared: [IUser];
  bookmarks: [IUser];
  transform: () => IMetrics;
}

/**
 * metrics schema
 */
const schema: mongoose.SchemaDefinition = {
  user: {
    type: mongoose.SchemaTypes.String,
    ref: 'User',
  },
  post: {
    type: mongoose.SchemaTypes.String,
    ref: 'Post',
  },
  likes: [
    {
      type: mongoose.SchemaTypes.String,
      ref: 'User',
    },
  ],
  comments: [
    {
      type: mongoose.SchemaTypes.String,
      ref: 'User',
    },
  ],
  shared: [
    {
      type: mongoose.SchemaTypes.String,
      ref: 'User',
    },
  ],
  bookmarks: [
    {
      type: mongoose.SchemaTypes.String,
      ref: 'User',
    },
  ],
};

// metrics collection name
const collectionName = 'metrics';

const metricsSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms metrics object
 * changes _id to id
 */
metricsSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates metrics model
 * @param conn database connection
 * @returns metrics model
 */
const MetricsModel = (conn: mongoose.Connection): mongoose.Model<IMetrics> =>
  conn.model(collectionName, metricsSchema);

export default MetricsModel;
