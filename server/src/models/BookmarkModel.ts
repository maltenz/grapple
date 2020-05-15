import mongoose from 'mongoose';
import { IMetric } from './MetricModel';

/**
 * @description holds bookmark model
 */

/**
 * User interface
 */
export interface IBookmark extends mongoose.Document {
  id: string;
  metric: IMetric;
  transform: () => IBookmark;
}

/**
 * bookmark schema
 */
const schema: mongoose.SchemaDefinition = {
  id: mongoose.SchemaTypes.String,
  metric: {
    type: mongoose.SchemaTypes.String,
    ref: 'Metric',
  },
};

// bookmark collection name
const collectionName = 'bookmark';

const bookmarkSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms bookmark object
 * changes _id to id
 */
bookmarkSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates bookmark model
 * @param conn database connection
 * @returns bookmark model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<IBookmark> =>
  conn.model(collectionName, bookmarkSchema);

export default UserModel;
