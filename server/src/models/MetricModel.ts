import mongoose from 'mongoose';
import { IUser } from './UserModel';
import { IPost } from './PostModel';

/**
 * @description holds metric model
 */

/**
 * Metric interface
 */
export interface IMetric extends mongoose.Document {
  id: string;
  post: IPost;
  user: IUser;
  likes: [IUser];
  comments: [IUser];
  shared: [IUser];
  bookmarks: [IUser];
  transform: () => IMetric;
}

/**
 * metric schema
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

// metric collection name
const collectionName = 'metric';

const metricSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms metric object
 * changes _id to id
 */
metricSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates metric model
 * @param conn database connection
 * @returns metric model
 */
const MetricModel = (conn: mongoose.Connection): mongoose.Model<IMetric> =>
  conn.model(collectionName, metricSchema);

export default MetricModel;
