import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Post } from './PostModel';

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
  @prop()
  public posts?: Array<Post>;
}

const UserModel = getModelForClass(User);

export default (conn: mongoose.Connection) => conn.model('User', UserModel.schema);
