import mongoose from 'mongoose';
import { IMetric } from './MetricModel';

/**
 * @description holds Shot model
 */

/**
 * User interface
 */
export interface IShot extends mongoose.Document {
  id: string;
  metric: IMetric;
  transform: () => IShot;
}

/**
 * Shot schema
 */
const schema: mongoose.SchemaDefinition = {
  id: mongoose.SchemaTypes.String,
  metric: {
    type: mongoose.SchemaTypes.String,
    ref: 'Metric',
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
const UserModel = (conn: mongoose.Connection): mongoose.Model<IShot> =>
  conn.model(collectionName, ShotSchema);

export default UserModel;
