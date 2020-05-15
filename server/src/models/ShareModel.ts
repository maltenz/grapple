import mongoose from 'mongoose';
import { IMetric } from './MetricModel';

/**
 * @description holds share model
 */

/**
 * User interface
 */
export interface IShare extends mongoose.Document {
  id: string;
  metric: IMetric;
  transform: () => IShare;
}

/**
 * share schema
 */
const schema: mongoose.SchemaDefinition = {
  id: mongoose.SchemaTypes.String,
  metric: {
    type: mongoose.SchemaTypes.String,
    ref: 'Metric',
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
