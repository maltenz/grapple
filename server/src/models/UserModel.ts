import mongoose from 'mongoose';

/**
 * @description holds user model
 */

/**
 * User interface
 */
export interface IUser extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  transform: () => IUser;
}

/**
 * user schema
 */
const schema: mongoose.SchemaDefinition = {
  name: { type: mongoose.SchemaTypes.String, required: true, unique: true },
  password: { type: mongoose.SchemaTypes.String, required: true },
  email: { type: mongoose.SchemaTypes.String, required: true },
};

// user collection name
const collectionName = 'user';

const userSchema: mongoose.Schema = new mongoose.Schema(schema);

/**
 * transforms user object
 * changes _id to id
 */
userSchema.methods.transform = function (): any {
  const obj = this.toObject();

  const id = obj._id;
  delete obj._id;
  obj.id = id;

  return obj;
};

/**
 * creates user model
 * @param conn database connection
 * @returns user model
 */
const UserModel = (conn: mongoose.Connection): mongoose.Model<IUser> =>
  conn.model(collectionName, userSchema);

export default UserModel;
