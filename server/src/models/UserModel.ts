import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

/**
 * User interface constructor
 */
export class User {
  _id?: mongoose.Types.ObjectId;
  @prop()
  public name?: string;
  @prop()
  public password?: string;
  @prop()
  public email?: string;
}

export const UserModel = getModelForClass(User);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default (conn: mongoose.Connection) => conn.model('User', UserModel.schema);
